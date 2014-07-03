<div id="iplist" class="iplist">
    <h2>精品推荐</h2>
    <ul>
        <% _.each(list,function(item){ %>
        <li><a href="#"><img class="mg-thumbnail" src="<%=item.img %>"/>
                <div class="info">
                    <span class="price"><span>¥</span><%=item.price %></span>
                    <span class="pname"><%=item.name %></span>
                </div>
            </a></li>
        <% })%>
    </ul>
</div>