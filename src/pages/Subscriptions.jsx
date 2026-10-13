import React, { useMemo, useState } from "react";
import { Search } from "lucide-react";

import { initialSubscriptions } from "../data/initialData";
import { getStorage } from "../utils/storage";
import Pagination from "../components/Pagination";
import EmptyState from "../components/EmptyState";

export default function Subscriptions() {
  const [subscriptions] = useState(() =>
    getStorage("saas_subscriptions", initialSubscriptions)
  );

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [plan, setPlan] = useState("All");
  const [page, setPage] = useState(1);

  const pageSize = 5;

  const filtered = useMemo(() => {
    return subscriptions.filter((item) => {
      const query = search.toLowerCase();

      const matchesSearch =
        item.customer.toLowerCase().includes(query) ||
        item.email.toLowerCase().includes(query) ||
        item.id.toLowerCase().includes(query);

      const matchesStatus =
        status === "All" || item.status === status;

      const matchesPlan =
        plan === "All" || item.plan === plan;

      return matchesSearch && matchesStatus && matchesPlan;
    });
  }, [subscriptions, search, status, plan]);

  const current = filtered.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">BILLING</span>
          <h1>Subscriptions</h1>
          <p>Monitor customer subscription lifecycle.</p>
        </div>
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
              placeholder="Search subscriptions..."
            />
          </div>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>All</option>
            <option>Active</option>
            <option>Trial</option>
            <option>Cancelled</option>
          </select>

          <select
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
          >
            <option>All</option>
            <option>Starter</option>
            <option>Pro</option>
            <option>Enterprise</option>
          </select>
        </div>

        {current.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Customer</th>
                    <th>Plan</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Start</th>
                    <th>Renewal</th>
                  </tr>
                </thead>

                <tbody>
                  {current.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <strong>{item.id}</strong>
                      </td>

                      <td>
                        <strong>{item.customer}</strong>
                        <span className="table-secondary">
                          {item.email}
                        </span>
                      </td>

                      <td>{item.plan}</td>

                      <td>${item.amount}</td>

                      <td>
                        <span
                          className={`status ${item.status.toLowerCase()}`}
                        >
                          {item.status}
                        </span>
                      </td>

                      <td>{item.start}</td>
                      <td>{item.renewal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Pagination
              page={page}
              totalPages={Math.ceil(filtered.length / pageSize)}
              onChange={setPage}
              totalItems={filtered.length}
              pageSize={pageSize}
            />
          </>
        )}
      </section>
    </div>
  );
}