import json
# this file will be used to create chache.js and db.js code.
# function to create file.
def write_json(data, filename):
	with open(filename,'a+') as file:
		print("in write_json and opned-------",filename,"-------- start writing")
		file.write(data)
		print("writning is done------")

# # to create id in the database.
# school_code = {}
# with open("raw_data") as file:
# 	# add [] and remove comma before hand from raw data
# 	print("start reading *** raw data   *****")
# 	data = json.load(file)
# 	print("data is loaded")
# 	# looping th rough all the data.
# 	count = 0
# 	new_data = []
# 	print("start adding **** ids to data *****")
# 	i = 0
# 	for student in data:
# 		# if i>1000:break
# 		# i = i+1
# 		try:
# 			student["s-code"] = student["school"][1:8]
# 			student["id"] = count
# 			s_code = student["s-code"]
# 			dist_code = student["district"]
# 			if(dist_code not in school_code):
# 				school_code[dist_code] = {}
# 			if(s_code not in school_code[dist_code]):
# 				school_code[dist_code][s_code] = student["school"][10:]
					
# 			new_data.append(student)
# 			count = count+1
# 		except Exception as e:
# 			print("ERROR is ", e)
# 	data = json.dumps(new_data)
# 	print("data is created",)
# 	# print("data is ++++++++++++",data)
# 	# print("school_code is *********",school_code)
# 	write_json(data,"predb")
	



# # to create sorted cache value. to run the range function.
# with open("predb") as file:
# 	print("opened the file ******* predb*****")
# 	data = json.load(file)
# 	print("data is loaded")
# 	data.sort(key = lambda student: float(student["percent"]) if len(student["percent"])>1 else 0)
# 	print("data is sorted")
# 	sort_cache = []
# 	cache = {}
# 	district = {}
# 	district_code = {}
# 	print("start creating cache data")
# 	for student in reversed(data):
# 		id = student["id"]
# 		dist = student["district"]
# 		s_code = student["s-code"]
# 		school = student["school"]

# 		try:
# 			sort_cache.append(id)  # creating the sorted.
# 			# creating district wise sorted array
# 			if dist in district:
# 				district[dist].append(id)
# 			else:
# 				district[dist] = [id]
# 			# creating school wise sorteed array  for each district code.
# 			if dist not in cache:
# 				cache[dist] = {}

# 			# creating district code start here
# 				district_name = ""
# 				name_index = len(school)-2  # name_index is start index of the district name.
# 				while(name_index>0 and school[name_index]!=','):
# 					name_index = name_index-1
# 				district_name = school[name_index+1:len(school)]
# 				if(district_name.find("(")!=-1):
# 					district_name = district_name[district_name.find("(")+1:district_name.find(")")]
# 				# print("working fine",school[name_index+1:len(school)])
# 				district_code[dist] = district_name
# 			# here distcrict code cration is done
# 			if s_code not in cache[dist]:
# 				cache[dist][s_code] = []
# 			cache[dist][s_code].append(id)
			 
# 		except Exception as e:
# 			print("ERROR is ", e)
# 	cache["sorted"] = sort_cache
# 	cache["district"] = district
# 	cache["school-code"] = school_code
# 	cache["district-code"] = district_code
# 	print("cache data is created")
# 	cashe_string = json.dumps(cache)
# 	# print(type(cashe_string))
# 	write_json(cashe_string,"precache")


# here i am going to convert json files javasctipt object and arrays.
with open("predb") as file:
	db = json.load(file)
	new_db = []
	for student in db:
		temp = [40,student["name"],int(student["roll_no"]),
				int(student["district"]),int(student["s-code"])]
		if len(student["percent"])>1: temp[0] = float(student["percent"])
		else: temp[0] = 0
		new_db.append(temp)
		
		
	data = "export let db = "+json.dumps(new_db)
	write_json(data,"dbtest1.js")
# with open("precache") as file:
# 	cache = json.load(file)
# 	data = "export let cache = "+json.dumps(cache)
# 	write_json(data,"cache.js")



		

