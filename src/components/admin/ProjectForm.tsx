"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { Project, ProjectFeature } from "@/lib/projects";
import FeatureIcon, { featureIconOptions } from "@/components/FeatureIcon";
import ImageCropper from "@/components/admin/ImageCropper";

const emptyFeature: ProjectFeature = { icon: "star", title: "", description: "" };

type PendingImage = { id: string; file: File; preview: string };
type CropRequest = { kind: "cover" | "gallery"; file: File; remaining?: File[] };

function TranslateButton({ loading, onClick }: { loading: boolean; onClick: () => void }) {
  return <button type="button" disabled={loading} onClick={onClick} className="rounded-full bg-[#302451]/10 px-3 py-1 text-[10px] font-bold text-[#302451] hover:bg-[#302451]/15 disabled:opacity-50">{loading ? "Translating…" : "Auto translate"}</button>;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function ProjectForm({ project }: { project?: Project }) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [slug, setSlug] = useState(project?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(project));
  const [tags, setTags] = useState<string[]>(project?.tags ?? ["Next.js"]);
  const [tagInput, setTagInput] = useState("");
  const [features, setFeatures] = useState<ProjectFeature[]>(
    project?.features.length ? project.features : [{ ...emptyFeature }]
  );
  const [featuresAr, setFeaturesAr] = useState<ProjectFeature[]>(
    project?.featuresAr.length ? project.featuresAr : project?.features.length ? project.features : [{ ...emptyFeature }]
  );
  const [descriptionAr, setDescriptionAr] = useState(project?.descriptionAr ?? "");
  const [longDescriptionAr, setLongDescriptionAr] = useState(project?.longDescriptionAr ?? "");
  const [translating, setTranslating] = useState("");
  const [galleryPaths, setGalleryPaths] = useState(project?.galleryPaths ?? []);
  const [coverPreview, setCoverPreview] = useState(project?.image ?? "");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<PendingImage[]>([]);
  const [cropRequest, setCropRequest] = useState<CropRequest | null>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const galleryByPath = useMemo(
    () => new Map(project?.galleryPaths.map((path, index) => [path, project.gallery[index]]) ?? []),
    [project]
  );

  function queueGalleryCrop(files: File[]) {
    if (!files.length) return;
    const available = Math.max(0, 12 - galleryPaths.length - galleryFiles.length);
    const accepted = files.slice(0, available);
    if (!accepted.length) {
      setError("The gallery can contain up to 12 images.");
      return;
    }
    setCropRequest({ kind: "gallery", file: accepted[0], remaining: accepted.slice(1) });
  }

  function acceptCrop(file: File) {
    if (!cropRequest) return;
    if (cropRequest.kind === "cover") {
      if (coverPreview.startsWith("blob:")) URL.revokeObjectURL(coverPreview);
      setCoverFile(file);
      setCoverPreview(URL.createObjectURL(file));
      setCropRequest(null);
      return;
    }

    setGalleryFiles((current) => [
      ...current,
      { id: crypto.randomUUID(), file, preview: URL.createObjectURL(file) },
    ]);
    const remaining = cropRequest.remaining ?? [];
    setCropRequest(remaining.length ? { kind: "gallery", file: remaining[0], remaining: remaining.slice(1) } : null);
  }

  function removeGalleryFile(id: string) {
    setGalleryFiles((current) => {
      const removed = current.find((image) => image.id === id);
      if (removed) URL.revokeObjectURL(removed.preview);
      return current.filter((image) => image.id !== id);
    });
  }

  function updateFeature(index: number, field: keyof ProjectFeature, value: string) {
    setFeatures((current) =>
      current.map((feature, itemIndex) =>
        itemIndex === index ? { ...feature, [field]: value } : feature
      )
    );
  }

  function updateFeatureAr(index: number, field: keyof ProjectFeature, value: string) {
    setFeaturesAr((current) => current.map((feature, itemIndex) => itemIndex === index ? { ...feature, [field]: value } : feature));
  }

  async function translateText(key: string, text: string, apply: (value: string) => void) {
    if (!text.trim()) { setError("Enter the English value before translating it."); return; }
    setTranslating(key);
    setError("");
    try {
      const response = await fetch("/api/admin/translate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Unable to translate this field.");
      apply(result.translation);
    } catch (translationError) {
      setError(translationError instanceof Error ? translationError.message : "Unable to translate this field.");
    } finally { setTranslating(""); }
  }

  function englishValue(name: string) {
    const control = formRef.current?.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement | null;
    return control?.value ?? "";
  }

  function addTag() {
    const value = tagInput.trim();
    if (value && !tags.includes(value) && tags.length < 12) {
      setTags([...tags, value]);
    }
    setTagInput("");
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    const formData = new FormData(event.currentTarget);
    formData.set("slug", slug);
    formData.set("tags", JSON.stringify(tags));
    formData.set("features", JSON.stringify(features));
    formData.set("featuresAr", JSON.stringify(featuresAr));
    formData.set("existingGalleryPaths", JSON.stringify(galleryPaths));
    formData.set("existingCoverPath", project?.coverImagePath ?? "");
    formData.set("isPublished", formData.get("isPublished") ? "true" : "false");
    formData.delete("coverImage");
    formData.delete("galleryImages");
    if (coverFile) formData.append("coverImage", coverFile);
    galleryFiles.forEach((image) => formData.append("galleryImages", image.file));

    const response = await fetch(
      project ? `/api/admin/projects/${project.id}` : "/api/admin/projects",
      { method: project ? "PATCH" : "POST", body: formData }
    );
    const result = await response.json();
    if (!response.ok) {
      setError(result.error ?? "Unable to save the project.");
      setPending(false);
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  const fieldClass =
    "mt-2 w-full rounded-2xl border border-[#302451]/15 bg-white/80 px-4 py-3 text-sm text-[#302451] outline-none transition placeholder:text-[#302451]/35 focus:border-[#302451]/50 focus:ring-4 focus:ring-[#302451]/8";

  return (
    <form ref={formRef} onSubmit={submit} className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div className="space-y-6">
        <section className="rounded-[26px] border border-white bg-white/70 p-5 shadow-sm backdrop-blur-xl sm:p-7">
          <h2 className="text-lg font-bold">Project basics</h2>
          <p className="mt-1 text-xs text-[#625b70]">The primary content visitors see on project cards and pages.</p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <label className="text-xs font-bold">Project title
              <input name="title" required maxLength={120} defaultValue={project?.title} className={fieldClass}
                onChange={(event) => !slugTouched && setSlug(slugify(event.target.value))} />
            </label>
            <label className="text-xs font-bold">URL slug
              <input name="slugDisplay" required value={slug} onChange={(event) => { setSlugTouched(true); setSlug(slugify(event.target.value)); }} className={fieldClass} />
            </label>
            <label className="text-xs font-bold">Category
              <input name="category" required maxLength={120} defaultValue={project?.category} className={fieldClass} />
            </label>
            <label className="text-xs font-bold">Client
              <input name="client" maxLength={120} defaultValue={project?.client ?? ""} className={fieldClass} />
            </label>
            <label className="text-xs font-bold">Completion date
              <input name="completionDate" maxLength={50} defaultValue={project?.completionDate ?? ""} placeholder="2026 or July 2026" className={fieldClass} />
            </label>
            <label className="text-xs font-bold">Display order
              <input name="displayOrder" type="number" min={0} max={9999} defaultValue={project?.displayOrder ?? 0} className={fieldClass} />
            </label>
          </div>
          <label className="mt-5 block text-xs font-bold">Short description
            <textarea name="description" required minLength={10} maxLength={500} rows={3} defaultValue={project?.description} className={fieldClass} />
          </label>
          <label className="mt-5 block text-xs font-bold">Full project description
            <textarea name="longDescription" required minLength={20} maxLength={5000} rows={6} defaultValue={project?.longDescription} className={fieldClass} />
          </label>
          <label className="mt-5 block text-xs font-bold">Live project URL
            <input name="liveUrl" type="url" required defaultValue={project?.liveUrl} placeholder="https://example.com" className={fieldClass} />
          </label>
        </section>

        <section dir="rtl" className="rounded-[26px] border border-[#302451]/10 bg-[#f7f4fb] p-5 text-right shadow-sm sm:p-7">
          <h2 className="text-lg font-bold">المحتوى العربي</h2>
          <p className="mt-1 text-xs text-[#625b70]">يُترجم الوصف فقط. يبقى اسم المشروع والتصنيف والعميل والتاريخ والرابط باللغة الإنجليزية في النسختين.</p>
          <label className="mt-5 block text-xs font-bold"><span className="flex items-center justify-between gap-2">الوصف المختصر <TranslateButton loading={translating === "descriptionAr"} onClick={() => translateText("descriptionAr", englishValue("description"), setDescriptionAr)} /></span><textarea name="descriptionAr" required minLength={10} maxLength={500} rows={3} value={descriptionAr} onChange={(event) => setDescriptionAr(event.target.value)} className={fieldClass} /></label>
          <label className="mt-5 block text-xs font-bold"><span className="flex items-center justify-between gap-2">الوصف الكامل <TranslateButton loading={translating === "longDescriptionAr"} onClick={() => translateText("longDescriptionAr", englishValue("longDescription"), setLongDescriptionAr)} /></span><textarea name="longDescriptionAr" required minLength={20} maxLength={5000} rows={6} value={longDescriptionAr} onChange={(event) => setLongDescriptionAr(event.target.value)} className={fieldClass} /></label>
        </section>

        <section className="rounded-[26px] border border-white bg-white/70 p-5 shadow-sm backdrop-blur-xl sm:p-7">
          <h2 className="text-lg font-bold">Technology tags</h2>
          <div className="mt-4 flex gap-2">
            <input value={tagInput} onChange={(event) => setTagInput(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); addTag(); } }} placeholder="Add a technology" className={`${fieldClass} mt-0`} />
            <button type="button" onClick={addTag} className="rounded-2xl bg-[#302451] px-5 text-sm font-bold text-white">Add</button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button key={tag} type="button" onClick={() => setTags(tags.filter((item) => item !== tag))} className="rounded-full bg-[#302451] px-4 py-2 text-xs font-bold text-white" title="Remove tag">
                {tag} <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-[26px] border border-white bg-white/70 p-5 shadow-sm backdrop-blur-xl sm:p-7">
          <div className="flex items-center justify-between">
            <div><h2 className="text-lg font-bold">Project highlights</h2><p className="mt-1 text-xs text-[#625b70]">Add the feature cards used on the project page.</p></div>
            <button type="button" onClick={() => { setFeatures([...features, { ...emptyFeature }]); setFeaturesAr([...featuresAr, { ...emptyFeature }]); }} className="inline-flex items-center gap-1.5 rounded-full bg-[#302451]/8 px-4 py-2 text-xs font-bold"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg> Feature</button>
          </div>
          <div className="mt-5 space-y-4">
            {features.map((feature, index) => (
              <div key={index} className="grid gap-3 rounded-2xl border border-[#302451]/10 bg-white/65 p-4 sm:grid-cols-[190px_1fr_auto]">
                <label className="text-[10px] font-bold uppercase tracking-[.08em] text-[#302451]/55">
                  Icon
                  <div className="mt-2 flex items-center gap-2">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#302451] text-white">
                      <FeatureIcon name={feature.icon} className="h-5 w-5" />
                    </span>
                    <select
                      aria-label="Feature icon"
                      value={feature.icon}
                      onChange={(event) => { updateFeature(index, "icon", event.target.value); updateFeatureAr(index, "icon", event.target.value); }}
                      className="min-w-0 flex-1 rounded-xl border border-[#302451]/15 bg-white px-2 py-3 text-xs font-semibold normal-case tracking-normal outline-none"
                    >
                      {featureIconOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </label>
                <div>
                  <input aria-label="Feature title" required value={feature.title} onChange={(event) => updateFeature(index, "title", event.target.value)} placeholder="Feature title" className={`${fieldClass} mt-0`} />
                  <textarea aria-label="Feature description" required value={feature.description} onChange={(event) => updateFeature(index, "description", event.target.value)} placeholder="What makes this valuable?" rows={2} className={fieldClass} />
                </div>
                <button type="button" onClick={() => { setFeatures(features.filter((_, itemIndex) => itemIndex !== index)); setFeaturesAr(featuresAr.filter((_, itemIndex) => itemIndex !== index)); }} className="self-start rounded-full bg-red-50 px-3 py-2 text-xs font-bold text-red-700">Remove</button>
              </div>
            ))}
          </div>
        </section>

        <section dir="rtl" className="rounded-[26px] border border-[#302451]/10 bg-[#f7f4fb] p-5 text-right shadow-sm sm:p-7">
          <h2 className="text-lg font-bold">مميزات المشروع بالعربية</h2>
          <div className="mt-5 space-y-4">
            {features.map((feature, index) => (
              <div key={index} className="rounded-2xl border border-[#302451]/10 bg-white/70 p-4">
                <label className="block text-xs font-bold"><span className="flex items-center justify-between gap-2">عنوان الميزة <TranslateButton loading={translating === `feature-title-${index}`} onClick={() => translateText(`feature-title-${index}`, feature.title, (value) => updateFeatureAr(index, "title", value))} /></span><input required value={featuresAr[index]?.title ?? ""} onChange={(event) => updateFeatureAr(index, "title", event.target.value)} className={fieldClass} /></label>
                <label className="mt-3 block text-xs font-bold"><span className="flex items-center justify-between gap-2">وصف الميزة <TranslateButton loading={translating === `feature-description-${index}`} onClick={() => translateText(`feature-description-${index}`, feature.description, (value) => updateFeatureAr(index, "description", value))} /></span><textarea required rows={2} value={featuresAr[index]?.description ?? ""} onChange={(event) => updateFeatureAr(index, "description", event.target.value)} className={fieldClass} /></label>
              </div>
            ))}
          </div>
        </section>
      </div>

      <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
        <section className="rounded-[26px] border border-white bg-white/75 p-5 shadow-sm backdrop-blur-xl">
          <h2 className="text-base font-bold">Cover image</h2>
          <div className="relative mt-4 aspect-[16/11] overflow-hidden rounded-2xl bg-[#302451]/8">
            {coverPreview ? <Image src={coverPreview} alt="Cover preview" fill className="object-cover object-top" /> : <div className="flex h-full items-center justify-center text-xs text-[#302451]/45">Image preview</div>}
          </div>
          <input ref={coverInputRef} type="file" accept="image/jpeg,image/png,image/webp,image/avif" className="sr-only" onChange={(event) => { const file = event.target.files?.[0]; if (file) setCropRequest({ kind: "cover", file }); event.currentTarget.value = ""; }} />
          <button type="button" onClick={() => coverInputRef.current?.click()} className="mt-4 w-full rounded-full bg-[#302451] px-4 py-2.5 text-xs font-bold text-white">{coverPreview ? "Replace & crop cover" : "Choose & crop cover"}</button>
          <p className="mt-2 text-[10px] leading-4 text-[#625b70]">JPG, PNG, WebP, or AVIF. Maximum 6 MB. Crop ratio: 16:11.</p>
        </section>

        <section className="rounded-[26px] border border-white bg-white/75 p-5 shadow-sm backdrop-blur-xl">
          <h2 className="text-base font-bold">Gallery</h2>
          {galleryPaths.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-2">
              {galleryPaths.map((path) => (
                <div key={path} className="relative aspect-[16/10] overflow-hidden rounded-xl bg-[#302451]/8">
                  {galleryByPath.get(path) && <Image src={galleryByPath.get(path)!} alt="" fill className="object-cover" />}
                  <button type="button" onClick={() => setGalleryPaths(galleryPaths.filter((item) => item !== path))} className="absolute right-1 top-1 rounded-full bg-red-600 px-2 py-1 text-[9px] font-bold text-white">Remove</button>
                </div>
              ))}
            </div>
          )}
          {galleryFiles.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-2">
              {galleryFiles.map((image, index) => (
                <div key={image.id} className="relative aspect-[16/10] overflow-hidden rounded-xl bg-[#302451]/8">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={image.preview} alt={`New gallery preview ${index + 1}`} className="h-full w-full object-cover" />
                  <span className="absolute bottom-1 left-1 rounded-full bg-black/65 px-2 py-1 text-[9px] font-bold text-white">New</span>
                  <button type="button" onClick={() => removeGalleryFile(image.id)} className="absolute right-1 top-1 rounded-full bg-red-600 px-2 py-1 text-[9px] font-bold text-white">Remove</button>
                </div>
              ))}
            </div>
          )}
          <input ref={galleryInputRef} type="file" multiple accept="image/jpeg,image/png,image/webp,image/avif" className="sr-only" onChange={(event) => { queueGalleryCrop(Array.from(event.target.files ?? [])); event.currentTarget.value = ""; }} />
          <button type="button" onClick={() => galleryInputRef.current?.click()} disabled={galleryPaths.length + galleryFiles.length >= 12} className="mt-4 w-full rounded-full bg-[#302451]/10 px-4 py-2.5 text-xs font-bold text-[#302451] disabled:cursor-not-allowed disabled:opacity-45">Add multiple gallery images</button>
          <p className="mt-2 text-[10px] leading-4 text-[#625b70]">{galleryPaths.length + galleryFiles.length}/12 images selected. You can add more files in several batches; each image opens in the crop tool.</p>
        </section>

        <section className="rounded-[26px] border border-white bg-white/75 p-5 shadow-sm backdrop-blur-xl">
          <label className="flex cursor-pointer items-center justify-between gap-4">
            <span><strong className="block text-sm">Publish project</strong><span className="mt-1 block text-[10px] text-[#625b70]">Visible immediately on the website.</span></span>
            <input name="isPublished" type="checkbox" defaultChecked={project?.isPublished ?? false} className="h-5 w-5 accent-[#302451]" />
          </label>
        </section>

        {error && <p role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-4 text-xs font-semibold text-red-700">{error}</p>}
        <button type="submit" disabled={pending} className="flex h-13 w-full items-center justify-center rounded-full bg-[#302451] text-sm font-bold text-white shadow-[0_14px_30px_rgba(48,36,81,.25)] transition hover:-translate-y-0.5 disabled:opacity-60">
          {pending ? "Saving…" : project ? "Save changes" : "Create project"}
        </button>
      </aside>
      {cropRequest && (
        <ImageCropper file={cropRequest.file} aspect={cropRequest.kind === "cover" ? 16 / 11 : 16 / 10} title={cropRequest.kind === "cover" ? "Crop cover image" : "Crop gallery image"} onCancel={() => setCropRequest(null)} onSave={acceptCrop} />
      )}
    </form>
  );
}
