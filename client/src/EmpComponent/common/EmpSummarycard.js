import React from 'react';

const EmpSummarycard = (props) => {
    return (
        <div>
             <div class="row row-cols-1 row-cols-md-2 row-cols-xl-3">
              <div class="col">
                <div class="card radius-10 border-start border-0 border-3 border-info">
                  <div class="card-body">
                    <div class="d-flex align-items-center">
                      <div>
                        <h4 class="mb-0 text-dark"> <b>Total Employee</b></h4>
                        <h4 class="my-1 text-info">{props.employeenumb}</h4>
                        
                      </div>
                      <div class="widgets-icons-2 rounded-circle bg-gradient-scooter text-white ms-auto">
                        <i class="fa fa-shopping-cart"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col">
                <div class="card radius-10 border-start border-0 border-3 border-danger">
                  <div class="card-body">
                    <div class="d-flex align-items-center">
                      <div>
                        <h4 class="mb-0 text-dark">
                          <b>Employee Present Today</b>
                        </h4>
                        <h4 class="my-1 text-danger">{props.presentemployee}</h4>
                        <p class="mb-0 font-13">5.4% </p>
                      </div>
                      <div class="widgets-icons-2 rounded-circle bg-gradient-bloody text-white ms-auto">
                        <i class="fa fa-dollar"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col">
                <div class="card radius-10 border-start border-0 border-3 border-success">
                  <div class="card-body">
                    <div class="d-flex align-items-center">
                      <div>
                        <h4 class="mb-0 text-dark"><b>Employee Absent Today</b></h4>
                        <h4 class="my-1 text-success">{props.absentemployee}</h4>
                        <p class="mb-0 font-13">4.5%</p>
                      </div>
                      <div class="widgets-icons-2 rounded-circle bg-gradient-ohhappiness text-white ms-auto">
                        <i class="fa fa-bar-chart"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
        </div>
    );
}

export default EmpSummarycard;
