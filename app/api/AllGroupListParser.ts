import ApiService from "./MireaApi"

export async function groupListParser() {
    const groupsArray = []
	const response = await ApiService.all_groups()
	for (let i = 0; i < response.groups.length; i++) {
		groupsArray.push({
			label: response.groups[i],
			value: response.groups[i]
		})
	}
    return groupsArray;
}


