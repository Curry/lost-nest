import pandas as pd

# d = pd.read_json('wormholes.json')
# d2 = pd.read_csv('https://raw.githubusercontent.com/exodus4d/pathfinder/master/export/csv/wormhole.csv', sep=';')

# final = pd.merge(d, d2, how='inner', left_on='name', right_on='Name')
# final = final.drop(columns=['Id', 'Name'])
# print(final.to_json(orient='records'))
def test(x):
    if 'C' in x['security']:
        x['class'] = int(x['security'][1:])
    elif x['security'] == '0.0':
        x['class'] = 9
    elif x['security'] == 'L':
        x['class'] = 8
    elif x['security'] == 'H':
        x['class'] = 7
    return x

d = pd.read_json('systems.json')
d2 = d.apply(test, axis=1)
d2.to_json(r'systems.json', orient='records', indent=2)