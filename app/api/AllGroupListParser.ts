import ApiService from "./MireaApi"

export async function GroupListParser() {
    let data = []
	const all_groups = await ApiService.all_groups()
	for (let i = 0; i < all_groups.groups.length; i++) {
		data.push({
			label: all_groups.groups[i],
			value: all_groups.groups[i]
		})
	}
    return data;
}


