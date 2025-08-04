import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function AdminTenant() {
  const [companyInfo, setCompanyInfo] = useState(null); // null = loading, {} = no tenant
  const [tenantUsers, setTenantUsers] = useState([]);
  const [tenantName, setTenantName] = useState("");
  const [tenantDescription, setTenantDescription] = useState("");
  const [newTenantName, setNewTenantName] = useState("");
  const [newTenantDescription, setNewTenantDescription] = useState("");

  // 🔹 Load user info and tenant data
  useEffect(() => {
    fetch("http://localhost:8000/user-info", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((userData) => {
        if (!userData.loggedIn) return;

        if (userData.company_id === 0) {
          setCompanyInfo({}); // no tenant assigned
        } else {
          fetch(`http://localhost:8001/tenant-info/${userData.company_id}`)
            .then((res) => res.json())
            .then((data) => {
              setCompanyInfo({
                id: userData.company_id,
                name: data.companyInfo.name,
                description: data.companyInfo.description,
              });
              setTenantName(data.companyInfo.name);
              setTenantDescription(data.companyInfo.description);
            });

          fetch(`http://localhost:8001/users-by-tenant/${userData.company_id}`)
            .then((res) => res.json())
            .then((data) => setTenantUsers(data.users));
        }
      });
  }, []);

  // 🔹 Submit tenant updates
  const handleUpdateSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8001/edit-tenant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        company_id: companyInfo.id,
        name: tenantName,
        description: tenantDescription,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message || "Tenant updated successfully");
      });
  };

  // 🔹 Create new tenant
  const handleCreateSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8000/user-info", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((userData) => {
        fetch("http://localhost:8001/create-tenant", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: newTenantName,
            description: newTenantDescription,
            user_id: userData.user_id,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.company_id) {
              window.location.reload(); // refresh after creating
            } else {
              alert(data.error || "Error while creating tenant");
            }
          });
      });
  };

  if (companyInfo === null) {
    return <div className="text-center mt-5">⏳ Loading data...</div>;
  }

  return (
    <div className="card shadow-sm p-4 my-4">
      {companyInfo.id ? (
        <>
          <h4 className="card-title mb-3">Your Tenant</h4>
          <h5 className="fst-italic fw-bold">{companyInfo.name}</h5>

          <form className="mb-4" onSubmit={handleUpdateSubmit}>
            <div className="card-body">
              <div className="form-floating mb-2">
                <input
                  type="text"
                  className="form-control"
                  id="tenant_name"
                  placeholder="Tenant name"
                  value={tenantName}
                  onChange={(e) => setTenantName(e.target.value)}
                />
                <label htmlFor="tenant_name">Tenant name</label>
              </div>
              <div className="form-floating mb-3">
                <textarea
                  className="form-control"
                  placeholder="Tenant description"
                  id="tenant_description"
                  value={tenantDescription}
                  onChange={(e) => setTenantDescription(e.target.value)}
                />
                <label htmlFor="tenant_description">Tenant description</label>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Save changes
            </button>
          </form>

          <h5>Tenant members</h5>
          <div className="card-body">
            <div className="overflow-x-auto" style={{ maxWidth: "100%" }}>
              <table className="table table-striped table-sm">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Full name</th>
                    <th>Email</th>
                    <th>Permission</th>
                    <th>Last login</th>
                    <th>Registration date</th>
                  </tr>
                </thead>
                <tbody>
                  {tenantUsers.map((user, index) => (
                    <tr key={user.email}>
                      <td>{index + 1}</td>
                      <td>
                        {user.name} {user.surname}
                      </td>
                      <td>{user.email}</td>
                      <td>{user.permission}</td>
                      <td>{user.last_login}</td>
                      <td>{user.registration_date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Link className="btn btn-success mt-3" to="/user/admin/register_to_tenant">
              <i className="bi bi-plus"></i> Add user to tenant
            </Link>
          </div>
        </>
      ) : (
        <>
          <h4 className="card-title mb-3">Create a new tenant</h4>
          <form className="mb-4" onSubmit={handleCreateSubmit}>
            <div className="card-body">
              <div className="form-floating mb-2">
                <input
                  type="text"
                  className="form-control"
                  id="new_tenant_name"
                  placeholder="Tenant name"
                  value={newTenantName}
                  onChange={(e) => setNewTenantName(e.target.value)}
                />
                <label htmlFor="new_tenant_name">Tenant name</label>
              </div>
              <div className="form-floating mb-3">
                <textarea
                  className="form-control"
                  placeholder="Tenant description"
                  id="new_tenant_description"
                  value={newTenantDescription}
                  onChange={(e) => setNewTenantDescription(e.target.value)}
                />
                <label htmlFor="new_tenant_description">Tenant description</label>
              </div>
            </div>
            <button type="submit" className="btn btn-success">
              Create tenant
            </button>
          </form>
        </>
      )}
    </div>
  );
}
