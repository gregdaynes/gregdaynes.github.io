class Cup
  ...
  def slow_drink
    sleep 10
    puts '*slurp*'
    sleep 10
    puts '*slurp*'
    sleep 10
    @filling = nil
  end
  ...
end
