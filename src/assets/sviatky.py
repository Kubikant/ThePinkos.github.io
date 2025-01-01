import json

x = open("src/assets/doma.json", "rt", encoding="utf-8")
x = x.read()

# parse x:
y = dict(json.loads(x))
y = y["tabuľka - doma"][30:30 + 365 + 1]

# the result is a Python dictionary:
for i in y:
    for j in i:
        if j == "poznámka":
            if "deň" in i.get(j, ""):
                datum = i.get("dátum")[0:5]

                print(f"\"{datum}\": \"{i.get(j)}\",")