(function() {
  window.refreshTable = function() {
    return $.ajax({
      type: "GET",
      url: "api/orders",
      success: function(res) {
        var r, row, _i, _len, _results;
        $(".tblData tbody").html("");
        _results = [];
        for (_i = 0, _len = res.length; _i < _len; _i++) {
          r = res[_i];
          row = $("<tr></tr>");
          row.append("<td>" + r.Id + "</td>");
          row.append("<td>" + r.TicketValue + "</td>");
          row.append("<td>" + r.FirstName + "</td>");
          row.append("<td>" + r.LastName + "</td>");
          row.append("<td>" + r.PhoneNumber + "</td>");
          row.append("<td>" + r.Email + "</td>");
          row.append("<td>" + r.CreditCardNumber + "</td>");
          _results.push($(".tblData tbody").append(row));
        }
        return _results;
      }
    });
  };

  $(function() {
    return window.refreshTable();
  });

}).call(this);

//# sourceMappingURL=datalist.js.map
