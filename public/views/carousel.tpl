<div id="carousel" class="carousel slide">
    <ol class="carousel-indicators">
       <% for(var i=0;i<list.length;i++){ %>
            <li data-target="#carousel" data-slide-to="<%= i %>"></li>
        <%}%>
    </ol>
    <div class="carousel-inner">
       <% _.each(list,function(o){ %>
        <div class="item">
            <a href="<%= o.link%>"><img src="<%= o.img %>"/></a>
        </div>
        <%});%>

    </div>
    <a class="left carousel-control" href="#carousel" data-slide="prev">
        <span class="glyphicon glyphicon-chevron-left"></span>
    </a>
    <a class="right carousel-control" href="#carousel" data-slide="next">
        <span class="glyphicon glyphicon-chevron-right"></span>
    </a>
</div>