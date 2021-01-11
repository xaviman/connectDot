def initalise():
    x = []
    for i in range(20):
        x.append([])
        for j in range(20):
            x[i].append(0)

    inp = "0 0"
    while inp != "stop":
        x[int(inp.split()[0])][int(inp.split()[1])] = 1

        # inp = "stop"
        x[0][1] = 1
        x[1][1] = 1
        x[1][0] = 1
        x[5][4] = 1
        x[6][4] = 1
        x[5][6] = 1
        x[6][6] = 1
        x[5][5] = 1
        x[6][5] = 1
        x[0][1] = 1
        x[18][18] = 1
        x[19][18] = 1
        x[18][19] = 1
        x[19][19] = 1

        for i in range(20):
            print(*x[i])
        check_win(x)
        inp = input()


def check_win(x):
    for i in range(0, len(x)-1):
        for j in range(0, len(x[i])-1):
            if(x[i][j] == x[i+1][j] == x[i][j+1] == x[i+1][j+1] == 1):
                print(i,j, True)


initalise()
