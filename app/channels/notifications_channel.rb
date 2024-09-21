class NotificationsChannel < ApplicationCable::Channel
  def subscribed
    @user = User.find(params[:user_id])
    stream_for @user

    puts "Subscribed to NotificationsChannel for User ##{@user.id}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
