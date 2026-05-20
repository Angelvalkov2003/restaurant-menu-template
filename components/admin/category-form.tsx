"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { saveCategory } from "@/app/admin/actions";
import { ImageUpload } from "@/components/admin/image-upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Category } from "@/types/db";

type Form = {
  id?: string;
  name_bg: string;
  name_en: string;
  image_url: string | null;
  sort_order: number;
};

export function CategoryForm({ initial }: { initial?: Category }) {
  const router = useRouter();
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState<Form>({
    id: initial?.id,
    name_bg: initial?.name_bg ?? "",
    name_en: initial?.name_en ?? "",
    image_url: initial?.image_url ?? null,
    sort_order: initial?.sort_order ?? 0,
  });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    setBusy(true);
    try {
      await saveCategory(form);
      router.push("/admin/categories");
      router.refresh();
    } catch {
      setErr("Save failed");
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          {form.id ? "Edit category" : "Add category"}
        </h1>
        <Button variant="outline" asChild>
          <Link href="/admin/categories">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </Button>
      </div>
      <form onSubmit={submit} className="space-y-4 rounded-lg border bg-white p-5">
        <ImageUpload
          value={form.image_url}
          onChange={(url) => setForm({ ...form, image_url: url })}
          seed={form.id ?? "new-cat"}
        />
        <div>
          <Label>Name (BG)</Label>
          <Input
            value={form.name_bg}
            onChange={(e) => setForm({ ...form, name_bg: e.target.value })}
            required
            className="mt-1"
          />
        </div>
        <div>
          <Label>Name (EN)</Label>
          <Input
            value={form.name_en}
            onChange={(e) => setForm({ ...form, name_en: e.target.value })}
            required
            className="mt-1"
          />
        </div>
        <div>
          <Label>Sort Order</Label>
          <Input
            type="number"
            value={form.sort_order}
            onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })}
            className="mt-1"
          />
          <p className="mt-1 text-xs text-zinc-500">Higher value appears first in list</p>
        </div>
        {err ? <p className="text-sm text-red-600">{err}</p> : null}
        <Button type="submit" className="w-full" disabled={busy}>
          {busy ? "Saving..." : "Save"}
        </Button>
      </form>
    </div>
  );
}
