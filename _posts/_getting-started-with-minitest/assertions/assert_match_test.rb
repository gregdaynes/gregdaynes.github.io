require_relative 'test_helper'

describe Coffee do
  matcher = /[a-zA-Z].+\!/
  it { assert_match matcher, Coffee.new.rating }
end
