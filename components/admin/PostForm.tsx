"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  createPostAction,
  updatePostAction,
  type ActionState,
} from "@/lib/actions";

interface PostData {
  id?: number;
  coverImage?: string | null;
  titleUz: string; titleRu: string; titleEn: string;
  excerptUz: string; excerptRu: string; excerptEn: string;
  bodyUz: string; bodyRu: string; bodyEn: string;
  published: boolean;
}

const tabs = [
  { key: "Uz", label: "O‘zbekcha", flag: "UZ" },
  { key: "Ru", label: "Русский", flag: "RU" },
  { key: "En", label: "English", flag: "EN" },
] as const;

const initial: ActionState = {};

export function PostForm({ post }: { post?: PostData }) {
  const isEdit = Boolean(post?.id);
  const action = isEdit ? updatePostAction : createPostAction;
  const [state, formAction, pending] = useActionState(action, initial);
  const [tab, setTab] = useState<"Uz" | "Ru" | "En">("Uz");
  const [preview, setPreview] = useState<string | null>(post?.coverImage ?? null);

  function onCover(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f) setPreview(URL.createObjectURL(f));
  }

  return (
    <form action={formAction} className="space-y-6">
      {isEdit && <input type="hidden" name="id" value={post!.id} />}

      <div className="flex items-center justify-between">
        <Link href="/admin" className="text-sm font-semibold text-ink-muted hover:text-brand">
          ← Back
        </Link>
        <h1 className="text-xl font-extrabold text-ink">
          {isEdit ? "Edit post" : "New post"}
        </h1>
        <div className="w-16" />
      </div>

      {state?.error && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
          Please fill at least one language’s title and body.
        </p>
      )}

      <div className="card p-5">
        <p className="field-label">Cover image</p>
        <div className="flex flex-wrap items-center gap-4">
          <div className="h-24 w-40 overflow-hidden rounded-lg border border-ink/10 bg-mist-light">
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview} alt="" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <Image src="/brand/mark-192.png" alt="" width={32} height={32} className="opacity-30" />
              </div>
            )}
          </div>
          <label className="btn-outline cursor-pointer">
            Choose image
            <input type="file" name="cover" accept="image/*" className="sr-only" onChange={onCover} />
          </label>
          {isEdit && <span className="text-xs text-ink-muted">Leave empty to keep current image.</span>}
        </div>
      </div>

      {/* Language tabs */}
      <div className="card overflow-hidden">
        <div className="flex border-b border-ink/5">
          {tabs.map((tb) => (
            <button
              key={tb.key}
              type="button"
              onClick={() => setTab(tb.key)}
              className={`flex-1 px-4 py-3 text-sm font-bold transition ${
                tab === tb.key
                  ? "border-b-2 border-brand bg-brand-50/50 text-brand-700"
                  : "text-ink-muted hover:bg-mist-light"
              }`}
            >
              {tb.label}
            </button>
          ))}
        </div>

        {tabs.map((tb) => {
          const k = tb.key;
          return (
            <div key={k} className={`space-y-4 p-5 ${tab === k ? "block" : "hidden"}`}>
              <div>
                <label className="field-label">Title ({tb.flag})</label>
                <input
                  name={`title${k}`}
                  className="field-input"
                  defaultValue={(post?.[`title${k}` as "titleUz"] as string) ?? ""}
                  placeholder={`Title in ${tb.label}`}
                />
              </div>
              <div>
                <label className="field-label">Excerpt ({tb.flag})</label>
                <input
                  name={`excerpt${k}`}
                  className="field-input"
                  defaultValue={(post?.[`excerpt${k}` as "excerptUz"] as string) ?? ""}
                  placeholder="Short summary shown on the news cards"
                />
              </div>
              <div>
                <label className="field-label">Body ({tb.flag})</label>
                <textarea
                  name={`body${k}`}
                  rows={12}
                  className="field-input resize-y font-[inherit] leading-relaxed"
                  defaultValue={(post?.[`body${k}` as "bodyUz"] as string) ?? ""}
                  placeholder={"Write the full article here.\n\nSeparate paragraphs with a blank line."}
                />
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-ink-muted">
        Tip: fill in at least one language. Empty languages automatically fall back to the one you filled in.
      </p>

      <div className="card flex flex-wrap items-center justify-between gap-4 p-5">
        <label className="flex items-center gap-2.5">
          <input
            type="checkbox"
            name="published"
            defaultChecked={post?.published ?? true}
            className="h-5 w-5 rounded border-ink/30 text-brand focus:ring-brand"
          />
          <span className="text-sm font-semibold text-ink">Published (visible on the site)</span>
        </label>
        <button type="submit" disabled={pending} className="btn-primary">
          {pending ? "Saving…" : "Save post"}
        </button>
      </div>
    </form>
  );
}
