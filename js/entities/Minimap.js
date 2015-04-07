//this function is to display my minimap
game.MiniMap = me.Entity.extend({
		init:function(x, y, settings){
			this._super(me.Entity, 'init', [x, y,{
			image: "minimap",
			width: 866,
			height: 488,
			spritewidth:"866",
			spriteheight:"488",
			getShape: function(){
				return(new me.Rect(0, 0, 866, 488)).toPolygon();
			}
	
		}]);
			this.floating = true;//this.floating makes my minimap move around the map
    }
		
});