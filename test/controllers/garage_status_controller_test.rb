require 'test_helper'

class GarageStatusControllerTest < ActionDispatch::IntegrationTest
  test "should get view" do
    get garage_status_view_url
    assert_response :success
  end

end
