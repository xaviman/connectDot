from django.http import HttpResponse, JsonResponse
from django.template import loader
import json
from .models import Move, Game


def create_Game(code, board, name, members):
    color = ["red", "blue", "green", "black"]
    print(code, board, name)
    try:
        game = Game.objects.get(game_id=code)
        dash_board = json.loads(game.dash_board)

        if name not in dash_board.keys() and len(dash_board) <= game.number_of_members:
            print("exe", color[len(dash_board)])
            dash_board[name] = [0, color[len(dash_board)]]
            print(dash_board, [i[0] for i in dash_board.keys()])
            game.dash_board = json.dumps(dash_board)
            game.start = len(dash_board) == game.number_of_members
            game.next_turn = [i for i in dash_board.keys()][0]
            game.save()
        return game
    except Exception as e:
        print(e, " Why am i getting excepon")
        game = Game(game_id=code,
                    board=json.dumps(board),
                    dash_board=json.dumps({name: [0, "red"]}),
                    number_of_members=members,
                    next_turn=name
                    )
        game.save()
        return game


def index(request, code=False, name=False):
    template = loader.get_template('connectDotu/index.html')
    if code and name:
        code = code.split("_")
        print(code)
        board = []
        for i in range(int(code[2])*2 - 1):
            board.append([])
            for j in range(int(code[2])*2 - 1):
                board[i].append(0)
        # print(board)
        game = create_Game(code[0], board, name, int(code[1]))
        print(game)
        context = {"menu": False,
                   "rows": range(int(code[2])),
                   "columns": range(int(code[2])),
                   "game": game,
                   "dash_board": json.loads(game.dash_board),
                   }
    elif not code:
        context = {"menu": True, "name": False}
    else:
        context = {"menu": False, "name": True}

    return HttpResponse(template.render(context, request))


def get_move(request, code, name, move):
    k = move.split("_")
    code = code.split("_")
    print(code, name, k)
    win_difference = []
    try:
        game = Game.objects.get(game_id=code[0])
        board = json.loads(game.board)
        if board[int(k[0])][int(k[1])] == 0:
            past = check_win(board)
            board[int(k[0])][int(k[1])] = name
            for i in range(len(board)):
                print(*[str(k)[0] for k in board[i]])
            print("ho")
            present = check_win(board)
            win_difference = [item for item in present if item not in past]
            print(win_difference, len(present), present)
            dash_board = json.loads(game.dash_board)

            if win_difference:
                dash_board[name][0] += len(win_difference)
                game.dash_board = json.dumps(dash_board)
                for win in win_difference:
                    board[win[0]][win[1]] = name
            else:
                ke = [i for i in dash_board.keys()]
                print("indeix", ke[0 if ke.index(name) +
                                   1 >= len(ke) else ke.index(name)+1])
                game.next_turn = ke[0 if ke.index(
                    name)+1 >= len(ke) else ke.index(name)+1]

        game.board = json.dumps(board)
        game.save()
    except Exception as e:
        print(e)
    return JsonResponse({"status": 200, "box": False, "score": win_difference})


def check_win(x):
    f = []
    for i in range(1, len(x)-1, 2):
        for j in range(1, len(x[i])-1, 2):
            if(x[i-1][j] and x[i+1][j] and x[i][j+1] and x[i][j-1]):
                f.append([i, j])
    return f


def update_board(request, code):
    try:
        game = Game.objects.get(game_id=code)
        board = json.loads(game.board)
        dash_board = json.loads(game.dash_board)
        k = 0
        for i in dash_board:
            k += dash_board[i][0]
        
        won = False
        if(k == int((len(board)-1)*(len(board)-1)/4)):
            l = 0
            for i in dash_board:
                print(dash_board[i][0], type(dash_board[i][0]))
                if l < dash_board[i][0]:
                    l = dash_board[i][0]
                    won = i
        return JsonResponse({"status":200 , "box": False, "board": board, "dash_board": dash_board, "status": game.start, "next_turn": game.next_turn, "member": game.number_of_members, "won": won})
    except Exception as e:
        return JsonResponse({"status": 400, "error": str(e)})
