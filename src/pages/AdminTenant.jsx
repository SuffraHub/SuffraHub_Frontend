import React, { useState } from "react";

export default function AdminTenant() {
  // Placeholdery na dane - zastąp potem fetchami do API
  const [companyInfo, setCompanyInfo] = useState({
    id: "123", // lub null jeśli brak dzierżawy
    name: "Tenant name example",
    description: "Tenant description example",
  });

  const [tenantUsers, setTenantUsers] = useState([
    {
      id: 1,
      imie: "Jan",
      nazwisko: "Kowalski",
      email: "jan.kowalski@example.com",
      description: "Administrator",
      last_login: "2025-07-28 12:34",
      registration_date: "2024-01-15",
    },
    {
      id: 2,
      imie: "Anna",
      nazwisko: "Nowak",
      email: "anna.nowak@example.com",
      description: "User",
      last_login: "2025-07-27 08:00",
      registration_date: "2024-06-03",
    },
  ]);

  const [tenantName, setTenantName] = useState(companyInfo.name);
  const [tenantDescription, setTenantDescription] = useState(
    companyInfo.description
  );

  const [newTenantName, setNewTenantName] = useState("");
  const [newTenantDescription, setNewTenantDescription] = useState("");

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    alert("API for tenant update will be here");
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    alert("API for creating a new tenant will be here");
  };

  return (
    <>
      {/* Tutaj możesz zaimportować własne komponenty header, sidepanel, svg */}

            <div className="card shadow-sm p-4 my-4">
              {companyInfo.id ? (
                <>
                  <h4 className="card-title mb-3">Your tenant</h4>
                  <h5 className="fst-italic fw-bold">{companyInfo.name}</h5>
                  <form className="mb-4" onSubmit={handleUpdateSubmit}>
                    <div className="card-body">
                      <div className="form-floating mb-2">
                        <input
                          type="text"
                          className="form-control"
                          id="tenant_name"
                          name="tenant_name"
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
                          name="tenant_description"
                          value={tenantDescription}
                          onChange={(e) => setTenantDescription(e.target.value)}
                        />
                        <label htmlFor="tenant_description">Tenant description</label>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Submit changes
                    </button>
                  </form>

                  <h5>Tenant members</h5>
                  <div className="card-body">
                    <div
                      className="overflow-x-auto"
                      style={{ maxWidth: "100%" }}
                    >
                      <table className="table table-striped table-sm">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Fullname</th>
                            <th scope="col">E-mail</th>
                            <th scope="col">Permissions</th>
                            <th scope="col">Last seen</th>
                            <th scope="col">Registration date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tenantUsers.map((user, index) => (
                            <tr key={user.id}>
                              <td>{index + 1}</td>
                              <td>
                                {user.imie} {user.nazwisko}
                              </td>
                              <td>{user.email}</td>
                              <td>{user.description}</td>
                              <td>{user.last_login}</td>
                              <td>{user.registration_date}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <a
                      className="btn btn-success"
                      href="/register_to_tenant.php"
                      role="button"
                    >
                      Add user to tenant
                    </a>
                  </div>
                </>
              ) : (
                <>
                  <h4 className="card-title mb-3">Utwórz nową dzierżawę</h4>
                  <form className="mb-4" onSubmit={handleCreateSubmit}>
                    <div className="card-body">
                      <div className="form-floating mb-2">
                        <input
                          type="text"
                          className="form-control"
                          id="new_tenant_name"
                          name="new_tenant_name"
                          placeholder="Nazwa dzierżawy"
                          value={newTenantName}
                          onChange={(e) => setNewTenantName(e.target.value)}
                        />
                        <label htmlFor="new_tenant_name">Nazwa dzierżawy</label>
                      </div>
                      <div className="form-floating mb-3">
                        <textarea
                          className="form-control"
                          placeholder="Opis dzierżawy"
                          id="new_tenant_description"
                          name="new_tenant_description"
                          value={newTenantDescription}
                          onChange={(e) =>
                            setNewTenantDescription(e.target.value)
                          }
                        />
                        <label htmlFor="new_tenant_description">
                          Opis dzierżawy
                        </label>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-success">
                      Utwórz dzierżawę
                    </button>
                  </form>
                </>
              )}
</div>
    </>
  );
}
