require 'test_helper'

class GarageControlControllerTest < ActionDispatch::IntegrationTest
  test "should get open_close" do
    get garage_control_open_close_url
    assert_response :success
  end

  test "should get timer_advance" do
    get garage_control_timer_advance_url
    assert_response :success
  end

end
