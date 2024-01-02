require_relative 'test_helper'

describe Coffee do
  it { assert_empty Coffee.new.extras }
end
