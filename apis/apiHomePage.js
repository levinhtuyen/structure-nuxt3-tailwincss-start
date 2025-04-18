import apiCaller from "@/api/apiCaller";

export async function getDataHomePage(params) {
	return await apiCaller.get("/", { params: params });
}
