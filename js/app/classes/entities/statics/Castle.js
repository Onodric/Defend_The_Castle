define(['StaticEntity', 'Tile', 'Assets', 'HealthBar', 'Rectangle', 'GameOverState', 'State'], function(StaticEntity, Tile, Assets, HealthBar, Rectangle, GameOverState, State){

	var assets = Assets.getAssets("castle");

	var Castle = StaticEntity.extend({
		init: function(_handler, _x, _y){
			this._super(_handler, _x, _y, Tile.TILE_WIDTH * 4, Tile.TILE_HEIGHT * 4);
			this.bounds.x = 0;
			this.bounds.y = 0;
			this.bounds.width = 80;
			this.bounds.height = 80;
			this.height = 80;
			this.width = 80;
			this.type = 'castle';
			this.health = 10;
			var healthbar_properties = {
				color: "#0c0",
				bgColor: "#a00",
				yOffset: 10,
				nodes: 100,
				split: 0,
				width: 80,
				height: 10,
				fadeTime: 1,
				renderOnFull: "on",
				border: {
					show: false,
					color: "#000",
					width: 2
				}
			};
			this.healthbar = new HealthBar(_handler, this, healthbar_properties);
		},
		tick: function(){
			if (this.health <= 0){
				console.log(this.type + " DIED!", this.dead);
				this.dead++;
				if (this.dead === 10){
					console.log("removing castle");
					this.dead = 666;
					this.handler.getWorld().getEntityManager().removeEntity(this);
					this.handler.getWorld().getSpatialGrid().remove(new Rectangle(this.x + this.bounds.x, this.y + this.bounds.y, this.bounds.width, this.bounds.height), this);
					gameOverState = new GameOverState(this.handler);
					State.setState(gameOverState);
				}
			}
		},
		render: function(_g){
			_g.myDrawImage(assets.sprite, 
							this.x - this.handler.getGameCamera().getxOffset(),
							this.y - this.handler.getGameCamera().getyOffset(), 
							this.width, 
							this.height);
			this.healthbar.render(_g);

			// _g.fillStyle = "green";
			// _g.fillRect(this.bounds.x + this.x - this.handler.getGameCamera().getxOffset(), this.bounds.y + this.y - this.handler.getGameCamera().getyOffset(), this.bounds.width, this.bounds.height);
		}

	});

	return Castle;
});