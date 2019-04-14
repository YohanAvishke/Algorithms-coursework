<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Max Flow</title>
    <link rel="stylesheet" type="text/css" href="assets/css/index.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
</head>
<body>
<div id="container">
    <div id="graph-container"></div>

    <button id="btn-collapse" class="btn btn-primary" data-toggle="collapse" data-target="#control-pane">CLICK ME
    </button>
    <div id="control-pane" class="alert collapse scroll">
        <div id="control-pane-body">
            <h4 class="alert-heading">Control Panel</h4>
            <hr>
            <h5 class="alert-heading">Steps</h5>
            <div id="container-steps"></div>
            <hr>
            <div id="detail-container" class="bg-light">
                <h5 class="alert-heading">Graph Details</h5>
                <span id="text-current-flow-container">Current Flow : </span><span id="text-current-flow-value">0</span>
            </div>

            <hr>
            <h5 class="alert-heading">Generate Network</h5>
            <div id="container-network" class="container">
                <button id="btn-auto" class="btn btn-light">Refresh</button>
                <button id="btn-manual" type="button" class="btn btn-light" data-toggle="modal"
                        data-target="#modal_input">Input Data
                </button>
                <div class="modal fade" id="modal_input" role="dialog">
                    <div class="modal-dialog modal-xl modal-dialog-scrollable">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title">Network Data Form</h4>
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                            </div>

                            <div class="modal-body">
                                <p>Please Fill the Form</p>
                                <form class="was-validated" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>" method="get">
                                    <div class="form-group">
                                        <label for="input-nodes" data-toggle="tooltip" data-placement="top"
                                               title="Number of Nodes">Nodes:</label>
                                        <input type="number" class="form-control" id="input-nodes" name="nodes" min="6"
                                               max="12" data-toggle="tooltip" data-placement="top"
                                               title="Number of Nodes" placeholder="Number of Nodes" required>
                                        <div class="valid-feedback">Valid.</div>
                                        <div class="invalid-feedback">Input a number from 6 to 12.</div>
                                    </div>
                                    <div id="edge-pane" class="form-group"></div>
                                    <button type="submit" class="btn btn-primary">Submit</button>
                                </form>
                            </div>

                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    </div>
</div>
<!--bootstrap-->
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
        integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
        crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
        integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
        crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
        integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
        crossorigin="anonymous"></script>
<!--sigma scripts start-->
<script src="assets/js/src/sigma-bundle.js"></script>
<!--sigma plugins-->
<script src="assets/js/build/plugins/sigma.renderers.edgeLabels.min.js"></script>
<script src="assets/js/build/plugins/sigma.layout.forceAtlas2.min.js"></script>
<script src="assets/js/build/plugins/sigma.plugins.dragNodes.min.js"></script>
<!--sigma scripts end-->
<script type="text/javascript" src="assets/js/fordfulkerson.js"></script>
<script type="text/javascript" src="assets/js/index.js"></script>
<script type="text/javascript" src="assets/js/graph.js"></script>
</body>
</html>