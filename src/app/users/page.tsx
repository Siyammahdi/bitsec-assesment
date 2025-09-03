import { UserTable } from "../../components/users/UserTable";

export default function UsersPage() {
  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="mb-4 flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Users</h1>
          <p className="text-sm text-slate-600">Manage users, roles, and status</p>
        </div>
      </div>
      <UserTable />
    </div>
  );
}


