helpers do
  
  def current_user
    @current_user ||= User.find_by_id(session[:user_id]) if session[:user_id]
  end

  def current_user=(user)
    session[:user_id] = user.id
  end

  def logged_in?
    !current_user.nil?
  end

  def logout
    session.clear
  end

  def patient?
    current_user.type == "Patient" if current_user
    false
  end

  def therapist?
    current_user.type == "Therapist" if current_user
    false
  end
  
end
