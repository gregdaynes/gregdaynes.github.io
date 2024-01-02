require_relative 'test_helper'

describe Cup do
  it { assert_nil Cup.new.filling }
end
