import { AdminPageHeader } from "@/components/admin/table";
import { MatchWorkspace } from "@/components/admin/match-workspace";
import {
  listBuyers,
  listSuppliers,
  listAssets,
  listMatches,
} from "@/lib/db/admin-queries";

export default async function AdminMatchesPage() {
  const [buyers, suppliers, assets, matches] = await Promise.all([
    listBuyers(),
    listSuppliers(),
    listAssets(),
    listMatches(),
  ]);

  return (
    <div>
      <AdminPageHeader
        title="Match workspace"
        subtitle="Score a buyer against a supplier using transparent rules, then create a match to track."
      />
      <MatchWorkspace
        buyers={buyers}
        suppliers={suppliers}
        assets={assets}
        matches={matches}
      />
    </div>
  );
}
