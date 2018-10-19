$("#main-left")
  .find("#mySidenavLeft .SurveyMenuItem")
  .on("click", function(e) {
    $("#data-column")
      .empty()
      .append('<div class="survey-container"></div>');

    const surveyContainer = new SurveyConstructor(".survey-container");
  });

function SurveyConstructor(container) {
  this.container = container instanceof jQuery ? container : $(container);
  _createBasicStructure(this.container);
  _setupEventListeners(this.container);

  function _setupEventListeners(container) {
    container
      .find("form")
      .off("submit")
      .on("submit", _buildJSON);
    container
      .find("#survey-element .SelectedType-Cell")
      .children(".SelectedType-Select")
      .off("click")
      .on("click", _typeSelect);
  }

  function _typeSelect(event) {
    const $select = $(event.target);
    const $typesCell = $select.parent().siblings("td.ValueType-Cell");
    const $typesCellHead = $select
      .closest("table")
      .find("thead th.FieldValues");

    if ($typesCellHead.find("button").length === 0) {
      $typesCellHead.append(
        `<button class="btn btn-success text-right">Nuevo</button>`
      );
    }

    switch ($select.val()) {
      case "text":
        $typesCell.empty().append(`
        <div class="form-group">
          <label>
            <p contenteditable="true">Modify this text</p>
             <input name="text_input[]" class="form-control" placeholder="Insert default value on this field" />
          </label>
        </div>`);
        break;
      case "select":
        $typesCell.empty().append(`
          <label>
            <p contenteditable="true">Modify this text</p>
            <select class="form-control" name="select_input[]"></select>
          </label>`);
        break;
    }
  }

  function _buildJSON(event) {
    event.preventDefault();
  }

  function _createBasicStructure(container) {
    container.append(` <div class="card">
    <div class="card-header">
        <h2>Create your survey</h2>
    </div>
    <div class="card-body">
      <form id="survey-form" method="POST" novalidate>
        <div class="form-row">
         <div class="col-md-3 offset-md-2">
          <label for="start_date">Start Date</label>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text" id="start_date_group_icon"><i class="far fa-calendar-alt"></i></span>
              </div>
              <input type="date" name="start_date" class="form-control mr-2" aria-describedby="start_date_group_icon" />
            </div>
            </div>
       <div class="col-md-3 offset-md-1">
            <label for="end_date">EndDate</label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="end_date_group_icon"><i class="fas fa-calendar-alt"></i></span>
                </div>
                <input type="date" name="end_date" class="form-control mr-2" aria-describedby="end_date_group_icon" />
              </div>
          </div>
        </div>
        <div class="form-group">
            <label for="title">Title</label>
            <input class="form-control" name="title" type="text">
        </div>
        <div class="form-group">
            <label for="subtitle">Subtitle</label>
            <input class="form-control" name="subtitle" type="text">
        </div>
        <div class="form-group">
            <label for="description">Explain briefly the purpose of this survey</label>
            <textarea name="description" cols="30" rows="4" class="form-control"></textarea>
        </div>
        <div id="survey-element" class="table-responsive mt-1">
            <table class="table table-bordered table-hover" role="grid">
                <thead class="thead-">
                    <tr>
                        <th class="FieldTypes"><i class="far fa-hand-pointer mr-4"></i><h4>Type of field</h4></th>
                        <th class="FieldValues d-flex justify-content-between">
                            <div class="CellTitle">
                                <i class="fas fa-sort-numeric-up mr-4"></i>
                                <h4>Values inside the field</h4>
                            </div>

                            </th>
                        <th class="FieldActions"><i class="fas fa-cogs mr-4"></i><h4>Actions</h4></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="SelectedType-Cell">
                            <select name="selected-type" class="form-control SelectedType-Select">
                                <option value="select">Selector</option>
                                <option value="checkboxes">Checkboxes</option>
                                <option value="radios">Radio</option>
                                <option value="text">Text</option>
                            </select>
                        </td>
                        <td class="ValueType-Cell">

                        </td>
                        <td class="actions text-center">
                         <button class="btn btn-outline-success">
                            <i class="far fa-plus-square mr-4"></i>
                         </button>
                        </td>
                    </tr>
                </tbody>
            </table>
          </div>
          <div class="card">
            <div class="card-header">
               Elements created
            </div>
            <div class="card-body">
                <ul class="list-group">
                    <li class="list-group-item list-group-item-action">
                    A simple primary list group item
                    </li>
                </ul>
            </div>
            <div class="card-footer">
               Elements created
            </div>
          </div>
          <button type="submit" class="btn btn-info btn-lg btn-block my-3">Create this survey</button>
        </form>
    </div>
</div>`);
  }
}
