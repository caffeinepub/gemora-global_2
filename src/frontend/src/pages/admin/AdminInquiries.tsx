import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { Inquiry } from "../../backend";
import AdminLayout from "../../components/AdminLayout";
import { useActor } from "../../hooks/useActor";

const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-500/20 text-blue-600 border-blue-500/30",
  read: "bg-sky-500/20 text-sky-500 border-sky-500/30",
  replied: "bg-green-500/20 text-green-600 border-green-500/30",
};

export default function AdminInquiries() {
  const { actor } = useActor();
  const qc = useQueryClient();

  const { data: inquiries } = useQuery<Inquiry[]>({
    queryKey: ["inquiries"],
    queryFn: () => actor!.getInquiries(),
    enabled: !!actor,
  });

  const updateMut = useMutation({
    mutationFn: ({ id, status }: { id: bigint; status: string }) =>
      actor!.updateInquiryStatus(id, status),
    onSuccess: () => {
      toast.success("Status updated");
      qc.invalidateQueries({ queryKey: ["inquiries"] });
    },
    onError: () => toast.error("Failed to update"),
  });

  return (
    <AdminLayout>
      <h1 className="font-serif text-2xl font-bold mb-6 text-primary">
        Inquiries
      </h1>
      <Table data-ocid="admin.inquiries_table">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>WhatsApp</TableHead>
            <TableHead>Requirement</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inquiries?.map((inq, i) => (
            <TableRow key={String(inq.id)}>
              <TableCell className="font-medium">{inq.name}</TableCell>
              <TableCell>{inq.country}</TableCell>
              <TableCell className="text-sm">{inq.whatsapp}</TableCell>
              <TableCell className="text-sm text-muted-foreground max-w-48 truncate">
                {inq.requirement}
              </TableCell>
              <TableCell>
                <Badge className={STATUS_COLORS[inq.status] || ""}>
                  {inq.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-2 items-center">
                  <Select
                    value={inq.status}
                    onValueChange={(v) =>
                      updateMut.mutate({ id: inq.id, status: v })
                    }
                  >
                    <SelectTrigger
                      className="w-24 h-7 text-xs"
                      data-ocid={`admin.status_select.${i + 1}`}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="read">Read</SelectItem>
                      <SelectItem value="replied">Replied</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-green-600 border-green-500/30 hover:bg-green-500/10 h-7 text-xs"
                    asChild
                    data-ocid={`admin.whatsapp_button.${i + 1}`}
                  >
                    <a
                      href={`https://wa.me/${inq.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(`Hi ${inq.name}, thanks for your inquiry at Gemora Global!`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      WhatsApp
                    </a>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
          {(!inquiries || inquiries.length === 0) && (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center text-muted-foreground py-8"
                data-ocid="admin.inquiries_table.empty_state"
              >
                No inquiries yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </AdminLayout>
  );
}
