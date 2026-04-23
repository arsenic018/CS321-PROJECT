package backend;


public class GameOver extends Game{
    /**
     * The fields used to determine the status of the game.
     */
	private int gameStatus;
    private int gameOver;

    /**
     * Constructor for initializing game status.
     * @param gameStatus 
     * @param gameOver 
     */
    protected GameOver(int gameStatus, int gameOver) {
        super(gameStatus);
        this.gameOver = gameOver;
    }

    /**
     * Get the game status.
     * @return 0 = Not started, 1 = Started, 2 = Winner, 3 = Loser.
     */
    protected int getGameStatus() {
        return gameStatus;
    }

    /**
     * Get the game over status.
     * @return 0 = Game has not ended, 1 = Game has ended.
     */
    protected int getGameOver() {
        return gameOver;
    }

    
    protected void setGameOver() {
        if (gameStatus == 0 || gameStatus == 1) {
            gameOver = 0;
        }
        else if (gameStatus == 2 || gameStatus == 3) {
            gameOver = 1;
        }
        assert(gameStatus < 4 && gameStatus >= 0);
    }
}
