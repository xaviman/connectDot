from django.db import models

# Create your models here.
class Game(models.Model):
    game_id = models.TextField(primary_key=True)
    board = models.TextField()
    dash_board = models.TextField()
    next_turn = models.TextField()
    number_of_members = models.IntegerField(default=2)
    start = models.BooleanField(default=False)

class Move(models.Model):
    move= models.TextField()