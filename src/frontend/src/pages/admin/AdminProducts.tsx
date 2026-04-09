import { Badge } from "@/components/ui/badge";
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
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FileSpreadsheet, ImageOff, Loader2, Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import AdminLayout from "../../components/AdminLayout";
import { useActor } from "../../hooks/useActor";
import { useStorageUpload } from "../../hooks/useStorageUpload";
import type { Category, Product } from "../../types";

type WebPBadgeInfo = {
  originalKB: number;
  webpKB: number;
  savedPercent: number;
};

type ProductForm = {
  categoryId: string;
  name: string;
  description: string;
  moq: string;
  imageUrls: string[];
  imageWebPInfo: Record<string, WebPBadgeInfo>;
  featured: boolean;
};

const EMPTY: ProductForm = {
  categoryId: "",
  name: "",
  description: "",
  moq: "",
  imageUrls: [],
  imageWebPInfo: {},
  featured: false,
};

const CSV_TEMPLATE =
  "name,description,moq,categoryId,imageUrl,featured\nKundan Necklace Set,Beautiful kundan set for bridal wear,$8/piece (min 50),1,https://example.com/img.jpg,false";

function WebPBadge({ info }: { info?: WebPBadgeInfo }) {
  if (!info) return null;
  return (
    <span
      className="absolute bottom-0 left-0 right-0 text-center text-[9px] font-bold rounded-b"
      style={{
        background: "rgba(46,125,50,0.85)",
        color: "#fff",
        padding: "2px 0",
      }}
      title={`WebP: ${info.webpKB.toFixed(0)}KB (${info.savedPercent.toFixed(0)}% smaller)`}
    >
      WebP ✓
    </span>
  );
}

export default function AdminProducts() {
  const { actor } = useActor();
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [csvOpen, setCsvOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState<ProductForm>(EMPTY);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const csvInputRef = useRef<HTMLInputElement>(null);
  const { uploadFileDetailed, uploading, converting, progress, uploadError } =
    useStorageUpload();

  const [csvImporting, setCsvImporting] = useState(false);
  const [csvProgress, setCsvProgress] = useState({ current: 0, total: 0 });

  const { data: products } = useQuery<Product[]>({
    queryKey: ["products", null],
    queryFn: () => actor!.getProducts([]),
    enabled: !!actor,
  });
  const { data: categories } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: () => actor!.getCategories(),
    enabled: !!actor,
  });

  const invalidate = () => qc.invalidateQueries({ queryKey: ["products"] });

  const createMutation = useMutation({
    mutationFn: () =>
      actor!.createProduct(
        BigInt(form.categoryId || "0"),
        form.name,
        form.description,
        form.moq,
        form.imageUrls,
        form.featured,
      ),
    onSuccess: () => {
      toast.success("Product created");
      setOpen(false);
      invalidate();
    },
    onError: () => toast.error("Failed to create product"),
  });

  const updateMutation = useMutation({
    mutationFn: () =>
      actor!.updateProduct(
        editing!.id,
        BigInt(form.categoryId || "0"),
        form.name,
        form.description,
        form.moq,
        form.imageUrls,
        form.featured,
      ),
    onSuccess: () => {
      toast.success("Product updated");
      setOpen(false);
      invalidate();
    },
    onError: () => toast.error("Failed to update product"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: bigint) => actor!.deleteProduct(id),
    onSuccess: () => {
      toast.success("Product deleted");
      invalidate();
    },
    onError: () => toast.error("Failed to delete product"),
  });

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY);
    setOpen(true);
  };
  const openEdit = (p: Product) => {
    setEditing(p);
    setForm({
      categoryId: String(p.categoryId),
      name: p.name,
      description: p.description,
      moq: p.moq,
      imageUrls: p.imageUrls,
      imageWebPInfo: {},
      featured: p.featured,
    });
    setOpen(true);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    for (const file of files) {
      try {
        const result = await uploadFileDetailed(file);
        setForm((f) => ({
          ...f,
          imageUrls: [...f.imageUrls, result.url],
          imageWebPInfo: {
            ...f.imageWebPInfo,
            [result.url]: {
              originalKB: result.originalKB,
              webpKB: result.webpKB,
              savedPercent: result.savedPercent,
            },
          },
        }));
      } catch {
        toast.error(
          "Upload failed — please check your internet connection and try again",
        );
      }
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDropUpload = async (droppedFiles: File[]) => {
    for (const file of droppedFiles) {
      try {
        const result = await uploadFileDetailed(file);
        setForm((f) => ({
          ...f,
          imageUrls: [...f.imageUrls, result.url],
          imageWebPInfo: {
            ...f.imageWebPInfo,
            [result.url]: {
              originalKB: result.originalKB,
              webpKB: result.webpKB,
              savedPercent: result.savedPercent,
            },
          },
        }));
      } catch {
        toast.error(
          "Upload failed — please check your internet connection and try again",
        );
      }
    }
  };

  const removeUploadedUrl = (idx: number) => {
    setForm((f) => ({
      ...f,
      imageUrls: f.imageUrls.filter((_, i) => i !== idx),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    editing ? updateMutation.mutate() : createMutation.mutate();
  };

  const downloadCsvTemplate = () => {
    const blob = new Blob([CSV_TEMPLATE], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "gemora_products_template.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCsvImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!actor) return;
    const file = e.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    const lines = text.split("\n").filter((l) => l.trim());
    if (lines.length < 2) {
      toast.error("CSV has no data rows");
      return;
    }
    const dataLines = lines.slice(1);
    setCsvImporting(true);
    setCsvProgress({ current: 0, total: dataLines.length });
    let successCount = 0;
    let failCount = 0;
    for (let i = 0; i < dataLines.length; i++) {
      setCsvProgress({ current: i + 1, total: dataLines.length });
      const cols = dataLines[i].split(",");
      if (cols.length < 4) {
        failCount++;
        continue;
      }
      const [name, description, moq, categoryId, imageUrl, featuredStr] =
        cols.map((c) => c.trim());
      if (!name) {
        failCount++;
        continue;
      }
      try {
        await actor.createProduct(
          BigInt(categoryId || "0"),
          name,
          description || "",
          moq || "",
          imageUrl ? [imageUrl] : [],
          featuredStr === "true",
        );
        successCount++;
      } catch {
        failCount++;
      }
    }
    setCsvImporting(false);
    setCsvProgress({ current: 0, total: 0 });
    if (csvInputRef.current) csvInputRef.current.value = "";
    invalidate();
    if (failCount === 0) {
      toast.success(
        `${successCount} product${successCount !== 1 ? "s" : ""} imported`,
      );
    } else {
      toast.success(`${successCount} imported, ${failCount} failed/skipped`);
    }
    setCsvOpen(false);
  };

  const uploadActive = converting || uploading;
  const uploadLabel = converting
    ? "Converting to WebP..."
    : uploading
      ? `Uploading... ${progress}%`
      : null;

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-serif text-2xl font-bold text-primary">Products</h1>
        <div className="flex gap-2">
          {/* CSV Import Dialog */}
          <Dialog open={csvOpen} onOpenChange={setCsvOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                style={{ borderColor: "#42A5F5", color: "#42A5F5" }}
                data-ocid="admin.products.import_button"
              >
                <FileSpreadsheet size={16} className="mr-2" />
                Import CSV
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Bulk Import Products via CSV</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-2">
                <div
                  className="rounded-lg p-3 text-sm"
                  style={{ background: "#e8f4fe", border: "1px solid #c5cae9" }}
                >
                  <p
                    style={{ color: "#1A237E", fontWeight: 600 }}
                    className="mb-1"
                  >
                    CSV Format Required:
                  </p>
                  <code className="text-xs" style={{ color: "#444" }}>
                    name, description, moq, categoryId, imageUrl, featured
                  </code>
                  <div className="mt-2">
                    <button
                      type="button"
                      onClick={downloadCsvTemplate}
                      className="text-sm underline font-medium"
                      style={{ color: "#42A5F5" }}
                    >
                      ↓ Download CSV template
                    </button>
                  </div>
                </div>
                <div>
                  <Label>Select CSV file</Label>
                  <div
                    className="mt-2 border-2 border-dashed rounded-lg p-6 text-center cursor-pointer"
                    style={{ borderColor: "#c5cae9", background: "#f5f7ff" }}
                    onClick={() =>
                      !csvImporting && csvInputRef.current?.click()
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ")
                        csvInputRef.current?.click();
                    }}
                    data-ocid="admin.products.csv_dropzone"
                  >
                    <input
                      ref={csvInputRef}
                      type="file"
                      accept=".csv"
                      className="hidden"
                      onChange={handleCsvImport}
                    />
                    <FileSpreadsheet
                      className="mx-auto mb-2"
                      size={28}
                      style={{ color: "#42A5F5" }}
                    />
                    <p className="text-sm" style={{ color: "#1A237E" }}>
                      Click to select your .csv file
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Import will start immediately after selection
                    </p>
                  </div>
                </div>
                {csvImporting && (
                  <div data-ocid="admin.products.csv_loading_state">
                    <div
                      className="flex justify-between text-xs mb-1"
                      style={{ color: "#1A237E" }}
                    >
                      <span>
                        Importing {csvProgress.current} of {csvProgress.total}
                        ...
                      </span>
                      <span>
                        {Math.round(
                          (csvProgress.current / csvProgress.total) * 100,
                        )}
                        %
                      </span>
                    </div>
                    <Progress
                      value={Math.round(
                        (csvProgress.current / csvProgress.total) * 100,
                      )}
                      className="h-2"
                    />
                  </div>
                )}
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setCsvOpen(false)}
                  disabled={csvImporting}
                  data-ocid="admin.products.csv_cancel_button"
                >
                  Cancel
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Add/Edit Product Dialog */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                className="bg-primary text-primary-foreground"
                onClick={openCreate}
                data-ocid="admin.add_button"
              >
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editing ? "Edit Product" : "Add Product"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-2">
                <div>
                  <Label>Category</Label>
                  <Select
                    value={form.categoryId}
                    onValueChange={(v) =>
                      setForm((f) => ({ ...f, categoryId: v }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories?.map((c) => (
                        <SelectItem key={String(c.id)} value={String(c.id)}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Name</Label>
                  <Input
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    required
                    data-ocid="admin.products.input"
                  />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={form.description}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, description: e.target.value }))
                    }
                    rows={3}
                  />
                </div>
                <div>
                  <Label>Wholesale Price / MOQ</Label>
                  <Input
                    value={form.moq}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, moq: e.target.value }))
                    }
                    placeholder="e.g. $5 / 50 pieces min"
                  />
                </div>

                {/* Image Upload — file only, no URL input */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <Label>Upload Product Images</Label>
                    <span className="text-xs text-muted-foreground">
                      Auto-converted to WebP
                    </span>
                  </div>
                  <div
                    className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors"
                    style={{
                      borderColor: uploadActive ? "#42A5F5" : "#c5cae9",
                      background: uploadActive ? "#e8f4fe" : "#f5f7ff",
                    }}
                    onClick={() =>
                      !uploadActive && fileInputRef.current?.click()
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ")
                        fileInputRef.current?.click();
                    }}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={async (e) => {
                      e.preventDefault();
                      const files = Array.from(e.dataTransfer.files).filter(
                        (f) => f.type.startsWith("image/"),
                      );
                      if (files.length) await handleDropUpload(files);
                    }}
                    data-ocid="admin.products.dropzone"
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    {uploadActive ? (
                      <div className="flex flex-col items-center gap-2">
                        <Loader2
                          size={22}
                          className="animate-spin"
                          style={{ color: "#42A5F5" }}
                        />
                        <p
                          className="text-sm font-medium"
                          style={{ color: "#42A5F5" }}
                        >
                          {uploadLabel}
                        </p>
                      </div>
                    ) : (
                      <>
                        <Upload
                          className="mx-auto mb-2 text-muted-foreground"
                          size={24}
                        />
                        <p className="text-sm text-muted-foreground">
                          Drag & drop images or{" "}
                          <span style={{ color: "#42A5F5" }}>
                            click to browse
                          </span>
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          PNG, JPG → auto-converted to WebP
                        </p>
                      </>
                    )}
                  </div>
                  {uploading && (
                    <div
                      className="mt-2"
                      data-ocid="admin.products.loading_state"
                    >
                      <Progress value={progress} className="h-2" />
                    </div>
                  )}
                  {uploadError && (
                    <p
                      className="mt-1 text-xs text-destructive"
                      data-ocid="admin.products.upload_error"
                    >
                      {uploadError}
                    </p>
                  )}
                  {form.imageUrls.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {form.imageUrls.map((url, i) => (
                        <div key={url} className="relative group">
                          <img
                            src={url}
                            alt="Preview"
                            className="w-16 h-16 object-cover rounded"
                          />
                          <WebPBadge info={form.imageWebPInfo[url]} />
                          <button
                            type="button"
                            onClick={() => removeUploadedUrl(i)}
                            className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
                            style={{ background: "crimson" }}
                            aria-label="Remove image"
                          >
                            <X size={10} color="#fff" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Switch
                    checked={form.featured}
                    onCheckedChange={(v) =>
                      setForm((f) => ({ ...f, featured: v }))
                    }
                  />
                  <Label>Featured Product</Label>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground"
                  disabled={
                    createMutation.isPending ||
                    updateMutation.isPending ||
                    uploadActive
                  }
                  data-ocid="admin.products.submit_button"
                >
                  {editing ? "Update" : "Create"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Table data-ocid="admin.products.table">
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>MOQ / Price</TableHead>
            <TableHead>Featured</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(products ?? []).length === 0 && (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center text-muted-foreground py-8"
                data-ocid="admin.products.empty_state"
              >
                No products yet. Add your first product.
              </TableCell>
            </TableRow>
          )}
          {(products ?? []).map((p, i) => (
            <TableRow
              key={String(p.id)}
              data-ocid={`admin.products.item.${i + 1}`}
            >
              <TableCell>
                {p.imageUrls.length > 0 ? (
                  <img
                    src={p.imageUrls[0]}
                    alt={p.name}
                    width={40}
                    height={40}
                    className="w-10 h-10 object-cover rounded-md border border-border"
                    loading="lazy"
                  />
                ) : (
                  <div
                    className="w-10 h-10 rounded-md flex items-center justify-center"
                    style={{
                      background: "#f5f7ff",
                      border: "1px solid #c5cae9",
                    }}
                  >
                    <ImageOff size={16} style={{ color: "#c5cae9" }} />
                  </div>
                )}
              </TableCell>
              <TableCell className="font-medium">{p.name}</TableCell>
              <TableCell className="text-muted-foreground text-sm">
                {p.moq}
              </TableCell>
              <TableCell>
                {p.featured ? (
                  <Badge className="bg-primary/20 text-primary border-primary/30">
                    Yes
                  </Badge>
                ) : null}
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openEdit(p)}
                    data-ocid={`admin.products.edit_button.${i + 1}`}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => {
                      if (
                        confirm("Are you sure you want to delete this product?")
                      )
                        deleteMutation.mutate(p.id);
                    }}
                    data-ocid={`admin.products.delete_button.${i + 1}`}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </AdminLayout>
  );
}
