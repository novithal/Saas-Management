
import React, { useEffect, useMemo, useState } from "react";
import { Edit3, Plus, Search, Trash2, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Modal from "../components/Modal";
import UserForm from "../components/UserForm";
import ConfirmDialog from "../components/ConfirmDialog";
import Pagination from "../components/Pagination";
import EmptyState from "../components/EmptyState";
import LoadingState from "../components/LoadingState";

import { initialUsers } from "../data/initialData";
import { getStorage, setStorage } from "../utils/storage";
import { getInitials } from "../utils/helpers";

export default function Users() {
  const navigate = useNavigate();

  const [users, setUsers] = useState(() =>
    getStorage("saas_users", initialUsers)
  );

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [plan, setPlan] = useState("All");
  const [sort, setSort] = useState("newest");

  const [page, setPage] = useState(1);
  const pageSize = 5;

  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);

  // Loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Search, filter and sort users
  const filtered = useMemo(() => {
    let result = [...users];

    if (search.trim()) {
      const query = search.toLowerCase().trim();

      result = result.filter(
        (user) =>
          user.name?.toLowerCase().includes(query) ||
          user.email?.toLowerCase().includes(query) ||
          user.company?.toLowerCase().includes(query)
      );
    }

    if (status !== "All") {
      result = result.filter((user) => user.status === status);
    }

    if (plan !== "All") {
      result = result.filter((user) => user.plan === plan);
    }

    if (sort === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sort === "revenue") {
      result.sort((a, b) => b.revenue - a.revenue);
    }

    if (sort === "newest") {
      result.sort(
        (a, b) => new Date(b.joined) - new Date(a.joined)
      );
    }

    return result;
  }, [users, search, status, plan, sort]);

  const totalPages = Math.ceil(filtered.length / pageSize);

  const current = filtered.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  // Add or edit user
  const saveUser = (data) => {
    let updated;

    if (editing) {
      updated = users.map((user) =>
        user.id === editing.id ? { ...user, ...data } : user
      );
    } else {
      updated = [
        ...users,
        {
          ...data,
          id: Date.now(),
        },
      ];
    }

    setUsers(updated);
    setStorage("saas_users", updated);

    setModal(false);
    setEditing(null);
    setPage(1);
  };

  // Delete user
  const deleteUser = () => {
    if (!deleting) return;

    const updated = users.filter(
      (user) => user.id !== deleting.id
    );

    setUsers(updated);
    setStorage("saas_users", updated);

    setDeleting(null);

    const remainingItems = updated.filter((user) => {
      const query = search.toLowerCase().trim();

      const matchesSearch =
        !query ||
        user.name?.toLowerCase().includes(query) ||
        user.email?.toLowerCase().includes(query) ||
        user.company?.toLowerCase().includes(query);

      const matchesStatus =
        status === "All" || user.status === status;

      const matchesPlan =
        plan === "All" || user.plan === plan;

      return matchesSearch && matchesStatus && matchesPlan;
    }).length;

    const remainingPages = Math.ceil(remainingItems / pageSize);

    if (page > Math.max(remainingPages, 1)) {
      setPage(Math.max(remainingPages, 1));
    }
  };

  const openCreate = () => {
    setEditing(null);
    setModal(true);
  };

  const openEdit = (user) => {
    setEditing(user);
    setModal(true);
  };

  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">CUSTOMERS</span>
          <h1>User management</h1>
          <p>Create, edit, search and manage SaaS customers.</p>
        </div>

        <button className="btn primary" onClick={openCreate}>
          <Plus size={18} />
          Add user
        </button>
      </div>

      <section className="panel">
        <div className="filter-toolbar">
          <div className="search-input">
            <Search size={18} />

            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search users..."
            />
          </div>

          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
          >
            <option value="All">All statuses</option>
            <option value="Active">Active</option>
            <option value="Trial">Trial</option>
            <option value="Inactive">Inactive</option>
          </select>

          <select
            value={plan}
            onChange={(e) => {
              setPlan(e.target.value);
              setPage(1);
            }}
          >
            <option value="All">All plans</option>
            <option value="Starter">Starter</option>
            <option value="Pro">Pro</option>
            <option value="Enterprise">Enterprise</option>
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="newest">Newest</option>
            <option value="name">Name</option>
            <option value="revenue">Revenue</option>
          </select>
        </div>

        {loading ? (
          <LoadingState />
        ) : current.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Company</th>
                    <th>Plan</th>
                    <th>Status</th>
                    <th>Usage</th>
                    <th>Revenue</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {current.map((user) => (
                    <tr key={user.id}>
                      <td>
                        <div className="user-cell">
                          <div className="avatar">
                            {getInitials(user.name)}
                          </div>

                          <div>
                            <strong>{user.name}</strong>
                            <span>{user.email}</span>
                          </div>
                        </div>
                      </td>

                      <td>{user.company}</td>

                      <td>
                        <span className="plan-pill">
                          {user.plan}
                        </span>
                      </td>

                      <td>
                        <span
                          className={`status ${user.status.toLowerCase()}`}
                        >
                          {user.status}
                        </span>
                      </td>

                      <td>
                        <div className="usage-cell">
                          <div className="progress">
                            <span
                              style={{
                                width: `${user.usage}%`,
                              }}
                            />
                          </div>

                          <small>{user.usage}%</small>
                        </div>
                      </td>

                      <td>${user.revenue}</td>

                      <td>
                        <div className="action-buttons">
                          <button
                            type="button"
                            title="View"
                            onClick={() =>
                              navigate(`/users/${user.id}`)
                            }
                          >
                            <Eye size={16} />
                          </button>

                          <button
                            type="button"
                            title="Edit"
                            onClick={() => openEdit(user)}
                          >
                            <Edit3 size={16} />
                          </button>

                          <button
                            type="button"
                            title="Delete"
                            onClick={() => setDeleting(user)}
                            className="danger-action"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Pagination
              page={page}
              totalPages={totalPages}
              onChange={setPage}
              totalItems={filtered.length}
              pageSize={pageSize}
            />
          </>
        )}
      </section>

      <Modal
        open={modal}
        title={editing ? "Edit user" : "Add new user"}
        onClose={() => {
          setModal(false);
          setEditing(null);
        }}
        width={700}
      >
        <UserForm
          initialData={editing}
          onSubmit={saveUser}
          onCancel={() => {
            setModal(false);
            setEditing(null);
          }}
        />
      </Modal>

      <ConfirmDialog
        open={!!deleting}
        onCancel={() => setDeleting(null)}
        onConfirm={deleteUser}
        title="Delete user?"
        message={`Are you sure you want to delete ${deleting?.name}?`}
      />
    </div>
  );
}
