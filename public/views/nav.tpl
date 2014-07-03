<nav class="navbar navbar-default navbar-fixed-top navbar-inverse" role="navigation">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#nav-menu">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="#"><img class="logo" id="logo" src="images/logo.png" alt=""/></a>
    </div>
    <div id="nav-menu" class="collapse navbar-collapse">
        <ul class="nav navbar-nav">
            <% _.each(navArr,function(nav){ %>
            <li><a href="<%= nav.link %>"><%= nav.name %></a></li>
            <% })%>
        </ul>
    </div>
</nav>