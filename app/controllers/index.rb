get '/' do
  @posts = all_posts
  erb :index
end

not_found do
	@request = request.path_info
	erb :not_found, layout: false
end