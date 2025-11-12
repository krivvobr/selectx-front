import { useQuery } from "@tanstack/react-query";
import { listLeads } from "@/services/leads";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Leads = () => {
  const { data: leads, isLoading, isError, error } = useQuery({
    queryKey: ["leads"],
    queryFn: listLeads,
  });

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold text-foreground mb-8">Leads</h1>
        {isLoading && (
          <div className="text-center text-muted-foreground py-8">
            Carregando leads...
          </div>
        )}
        {isError && (
          <div className="text-center text-red-500 py-8">
            Erro ao carregar leads: {String((error as any)?.message ?? "")}
          </div>
        )}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>URL do Imóvel</TableHead>
              <TableHead>Data</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(leads ?? []).map((lead) => (
              <TableRow key={lead.id}>
                <TableCell>{lead.name}</TableCell>
                <TableCell>{lead.email}</TableCell>
                <TableCell>{lead.phone}</TableCell>
                <TableCell>
                  <a
                    href={lead.property_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Ver Imóvel
                  </a>
                </TableCell>
                <TableCell>
                  {new Date(lead.created_at!).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Footer />
    </div>
  );
};

export default Leads;
