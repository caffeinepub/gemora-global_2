import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CloudUpload, Images, Loader2, Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import AdminLayout from "../../components/AdminLayout";
import { useActor } from "../../hooks/useActor";
import { useStorageUpload } from "../../hooks/useStorageUpload";
import type { GalleryItem } from "../../types";

type GForm = {
  imageUrl: string;
  caption: string;
  itemType: string;
  sortOrder: string;
  webpKB?: number;
  originalKB?: number;
};
const EMPTY: GForm = {
  imageUrl: "",
  caption: "",
  itemType: "lifestyle",
  sortOrder: "0",
};

type BulkItem = {
  name: string;
  status: "pending" | "converting" | "uploading" | "done" | "error";
  webpKB?: number;
  originalKB?: number;
};

export default function AdminGallery() {
  const { actor } = useActor();
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<GalleryItem | null>(null);
  const [form, setForm] = useState<GForm>(EMPTY);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const bulkInputRef = useRef<HTMLInputElement>(null);
  const { uploadFileDetailed, uploading, converting, progress, uploadError } =
    useStorageUpload();

  const [bulkItems, setBulkItems] = useState<BulkItem[]>([]);
  const [bulkRunning, setBulkRunning] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const { data: items } = useQuery<GalleryItem[]>({
    queryKey: ["gallery", ""],
    queryFn: () => actor!.getGallery([]),
    enabled: !!actor,
  });

  const invalidate = () => qc.invalidateQueries({ queryKey: ["gallery"] });

  const createMut = useMutation({
    mutationFn: () =>
      actor!.createGalleryItem(
        form.imageUrl,
        form.caption,
        form.itemType,
        BigInt(form.sortOrder || "0"),
      ),
    onSuccess: () => {
      toast.success("Added");
      setOpen(false);
      invalidate();
    },
    onError: () => toast.error("Failed to save gallery item"),
  });

  const updateMut = useMutation({
    mutationFn: () =>
      actor!.updateGalleryItem(
        editing!.id,
        form.imageUrl,
        form.caption,
        form.itemType,
        BigInt(form.sortOrder || "0"),
      ),
    onSuccess: () => {
      toast.success("Updated");
      setOpen(false);
      invalidate();
    },
    onError: () => toast.error("Failed to update gallery item"),
  });

  const deleteMut = useMutation({
    mutationFn: (id: bigint) => actor!.deleteGalleryItem(id),
    onSuccess: () => {
      toast.success("Deleted");
      invalidate();
    },
    onError: () => toast.error("Failed to delete gallery item"),
  });

  const openEdit = (item: GalleryItem) => {
    setEditing(item);
    setForm({
      imageUrl: item.imageUrl,
      caption: item.caption,
      itemType: item.itemType,
      sortOrder: String(item.sortOrder),
    });
    setOpen(true);
  };

  const handleSingleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const result = await uploadFileDetailed(file);
      setForm((f) => ({
        ...f,
        imageUrl: result.url,
        webpKB: result.webpKB,
        originalKB: result.originalKB,
      }));
      toast.success("Image uploaded & converted to WebP");
    } catch {
      toast.error(
        "Upload failed — please check your internet connection and try again",
      );
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleBulkUpload = async (files: FileList | File[]) => {
    if (!actor) return;
    const fileArr = Array.from(files)
      .filter((f) => f.type.startsWith("image/"))
      .slice(0, 10);
    if (!fileArr.length) return;

    const initial: BulkItem[] = fileArr.map((f) => ({
      name: f.name,
      status: "pending",
    }));
    setBulkItems(initial);
    setBulkRunning(true);

    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < fileArr.length; i++) {
      const file = fileArr[i];
      setBulkItems((prev) =>
        prev.map((it, idx) =>
          idx === i ? { ...it, status: "converting" } : it,
        ),
      );
      try {
        const result = await uploadFileDetailed(file);
        setBulkItems((prev) =>
          prev.map((it, idx) =>
            idx === i
              ? {
                  ...it,
                  status: "uploading",
                  webpKB: result.webpKB,
                  originalKB: result.originalKB,
                }
              : it,
          ),
        );
        const caption = file.name.replace(/\.[^/.]+$/, "");
        await actor.createGalleryItem(
          result.url,
          caption,
          "lifestyle",
          BigInt(0),
        );
        setBulkItems((prev) =>
          prev.map((it, idx) => (idx === i ? { ...it, status: "done" } : it)),
        );
        successCount++;
      } catch {
        setBulkItems((prev) =>
          prev.map((it, idx) => (idx === i ? { ...it, status: "error" } : it)),
        );
        failCount++;
      }
    }

    setBulkRunning(false);
    if (bulkInputRef.current) bulkInputRef.current.value = "";
    invalidate();

    if (failCount === 0) {
      toast.success(
        `${successCount} image${successCount !== 1 ? "s" : ""} uploaded & converted to WebP`,
      );
    } else {
      toast.warning(
        `${successCount} uploaded, ${failCount} failed — check connection and retry`,
      );
    }
    setTimeout(() => setBulkItems([]), 3000);
  };

  const uploadActive = converting || uploading;

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-serif text-2xl font-bold text-primary">
          Gallery / Media
        </h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-primary text-primary-foreground"
              onClick={() => {
                setEditing(null);
                setForm(EMPTY);
                setOpen(true);
              }}
              data-ocid="admin.gallery.add_button"
            >
              Add Image
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editing ? "Edit" : "Add"} Gallery Item</DialogTitle>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                editing ? updateMut.mutate() : createMut.mutate();
              }}
              className="space-y-3 mt-2"
            >
              {/* File Upload only — no URL input */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <Label>Upload Image</Label>
                  <span className="text-xs text-muted-foreground">
                    Auto-converted to WebP
                  </span>
                </div>
                <div
                  className="border-2 border-dashed rounded-lg p-5 text-center cursor-pointer transition-colors"
                  style={{
                    borderColor: uploadActive ? "#42A5F5" : "#c5cae9",
                    background: uploadActive ? "#e8f4fe" : "#f5f7ff",
                  }}
                  onClick={() => !uploadActive && fileInputRef.current?.click()}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ")
                      fileInputRef.current?.click();
                  }}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={async (e) => {
                    e.preventDefault();
                    const file = e.dataTransfer.files?.[0];
                    if (!file || !file.type.startsWith("image/")) return;
                    try {
                      const result = await uploadFileDetailed(file);
                      setForm((f) => ({
                        ...f,
                        imageUrl: result.url,
                        webpKB: result.webpKB,
                        originalKB: result.originalKB,
                      }));
                      toast.success("Image uploaded & converted to WebP");
                    } catch {
                      toast.error(
                        "Upload failed — please check your internet connection and try again",
                      );
                    }
                  }}
                  data-ocid="admin.gallery.dropzone"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleSingleFile}
                  />
                  {uploadActive ? (
                    <div className="flex flex-col items-center gap-2">
                      <Loader2
                        size={20}
                        className="animate-spin"
                        style={{ color: "#42A5F5" }}
                      />
                      <p
                        className="text-sm font-medium"
                        style={{ color: "#42A5F5" }}
                      >
                        {converting
                          ? "Converting to WebP..."
                          : `Uploading... ${progress}%`}
                      </p>
                    </div>
                  ) : (
                    <>
                      <Upload
                        className="mx-auto mb-2 text-muted-foreground"
                        size={20}
                      />
                      <p className="text-sm text-muted-foreground">
                        Drag & drop or click to upload
                      </p>
                    </>
                  )}
                </div>
                {uploadError && (
                  <p
                    className="mt-1 text-xs text-destructive"
                    data-ocid="admin.gallery.upload_error"
                  >
                    {uploadError}
                  </p>
                )}
                {uploading && (
                  <div className="mt-2" data-ocid="admin.gallery.loading_state">
                    <Progress value={progress} className="h-2" />
                  </div>
                )}
                {form.imageUrl && (
                  <div className="mt-2 relative inline-block">
                    <img
                      src={form.imageUrl}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    {form.webpKB !== undefined && (
                      <span
                        className="absolute bottom-1 left-1 text-[10px] font-bold px-1.5 py-0.5 rounded"
                        style={{
                          background: "rgba(46,125,50,0.85)",
                          color: "#fff",
                        }}
                      >
                        WebP ✓ {form.webpKB.toFixed(0)}KB
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() =>
                        setForm((f) => ({
                          ...f,
                          imageUrl: "",
                          webpKB: undefined,
                          originalKB: undefined,
                        }))
                      }
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ background: "crimson" }}
                      aria-label="Remove image"
                    >
                      <X size={10} color="#fff" />
                    </button>
                  </div>
                )}
              </div>

              <div>
                <Label>Caption</Label>
                <Input
                  value={form.caption}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, caption: e.target.value }))
                  }
                />
              </div>
              <div>
                <Label>Type</Label>
                <Select
                  value={form.itemType}
                  onValueChange={(v) => setForm((f) => ({ ...f, itemType: v }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lifestyle">Lifestyle</SelectItem>
                    <SelectItem value="bulk">Bulk Orders</SelectItem>
                    <SelectItem value="packaging">Packaging</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Sort Order</Label>
                <Input
                  type="number"
                  value={form.sortOrder}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, sortOrder: e.target.value }))
                  }
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground"
                disabled={
                  createMut.isPending || updateMut.isPending || uploadActive
                }
                data-ocid="admin.gallery.submit_button"
              >
                Save
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Bulk Upload Zone — up to 10 images, drag-and-drop, per-image progress */}
      <div
        className="mb-6 rounded-xl border-2 border-dashed transition-all"
        style={{
          borderColor: isDragOver
            ? "#42A5F5"
            : bulkRunning
              ? "#42A5F5"
              : "#c5cae9",
          background: isDragOver ? "#e8f4fe" : "#f5f7ff",
          padding: "28px 24px",
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragOver(false);
          if (!bulkRunning) handleBulkUpload(e.dataTransfer.files);
        }}
        data-ocid="admin.gallery.bulk_dropzone"
      >
        <div className="flex flex-col items-center gap-3">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ background: "rgba(66,165,245,0.15)" }}
          >
            <Images size={24} style={{ color: "#42A5F5" }} />
          </div>
          <div className="text-center">
            <p
              className="font-semibold"
              style={{ color: "#1A237E", fontSize: 15 }}
            >
              Bulk Upload Images (up to 10)
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Drag & drop multiple images here, or{" "}
              <button
                type="button"
                className="underline font-medium"
                style={{ color: "#42A5F5" }}
                onClick={() => !bulkRunning && bulkInputRef.current?.click()}
                data-ocid="admin.gallery.upload_button"
              >
                click to browse
              </button>
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              All images are automatically converted to WebP before upload
            </p>
          </div>

          <input
            ref={bulkInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.length) handleBulkUpload(e.target.files);
            }}
          />

          {!bulkRunning && bulkItems.length === 0 && (
            <Button
              variant="outline"
              size="sm"
              style={{ borderColor: "#42A5F5", color: "#42A5F5" }}
              onClick={() => bulkInputRef.current?.click()}
              data-ocid="admin.gallery.secondary_button"
            >
              <CloudUpload size={16} className="mr-2" />
              Select Files
            </Button>
          )}
        </div>

        {/* Per-image progress list */}
        {bulkItems.length > 0 && (
          <div
            className="mt-4 space-y-2 max-w-md mx-auto"
            data-ocid="admin.gallery.bulk_loading_state"
          >
            {bulkItems.map((item) => (
              <div
                key={item.name}
                className="flex items-center gap-3 text-sm rounded-lg px-3 py-2"
                style={{ background: "#fff", border: "1px solid #e3e8f0" }}
              >
                <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                  {item.status === "done" && (
                    <span style={{ color: "#2e7d32", fontSize: 14 }}>✓</span>
                  )}
                  {item.status === "error" && (
                    <span style={{ color: "crimson", fontSize: 14 }}>✗</span>
                  )}
                  {(item.status === "converting" ||
                    item.status === "uploading" ||
                    item.status === "pending") && (
                    <Loader2
                      size={14}
                      className="animate-spin"
                      style={{ color: "#42A5F5" }}
                    />
                  )}
                </div>
                <span
                  className="flex-1 truncate"
                  style={{ color: "#1A237E", fontSize: 12 }}
                >
                  {item.name}
                </span>
                <span
                  className="text-xs flex-shrink-0"
                  style={{
                    color:
                      item.status === "done"
                        ? "#2e7d32"
                        : item.status === "error"
                          ? "crimson"
                          : "#888",
                  }}
                >
                  {item.status === "converting" && "Converting..."}
                  {item.status === "uploading" && "Uploading..."}
                  {item.status === "pending" && "Waiting..."}
                  {item.status === "done" &&
                    item.webpKB !== undefined &&
                    `WebP ✓ ${item.webpKB.toFixed(0)}KB`}
                  {item.status === "done" &&
                    item.webpKB === undefined &&
                    "Done"}
                  {item.status === "error" && "Failed"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {(items ?? []).map((item, i) => (
          <div
            key={String(item.id)}
            className="rounded-lg overflow-hidden border border-border group relative"
            data-ocid={`admin.gallery.item.${i + 1}`}
          >
            <img
              src={item.imageUrl}
              alt={item.caption}
              className="w-full aspect-square object-cover"
            />
            <div className="p-2 text-xs text-muted-foreground truncate">
              {item.caption}
            </div>
            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                size="sm"
                variant="outline"
                className="h-6 text-xs"
                onClick={() => openEdit(item)}
                data-ocid={`admin.gallery.edit_button.${i + 1}`}
              >
                Edit
              </Button>
              <Button
                size="sm"
                variant="destructive"
                className="h-6 text-xs"
                onClick={() => {
                  if (confirm("Are you sure you want to delete this image?"))
                    deleteMut.mutate(item.id);
                }}
                data-ocid={`admin.gallery.delete_button.${i + 1}`}
              >
                Del
              </Button>
            </div>
          </div>
        ))}
        {(!items || items.length === 0) && (
          <div
            className="col-span-4 text-center py-12 text-muted-foreground"
            data-ocid="admin.gallery.empty_state"
          >
            No gallery items yet.
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
