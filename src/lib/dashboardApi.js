const BASE_URL = "http://127.0.0.1:8000"

export async function getDashboard() {
  const response = await fetch(`${BASE_URL}/dashboards/`);

  if (!response.ok) {
    throw new Error("Gagal mengambil data dashboard");
  }

  return await response.json();
}
