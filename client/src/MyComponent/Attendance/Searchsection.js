import React from 'react';
import SearchSection from '../common/SearchSection'
const Searchsection = (props) => {
    return (
        
             <div className="attendance_pagesearch_section">
                                  <SearchSection
                                    labeltext={""}
                                    inputtype={"text"}
                                    value={props.nameval}
                                    onMonthChange={props.onNameChange}
                                      onClear={props.onClear}
                                    
                                  />
                                  {/* <SearchSection
                                    labeltext={"Date"}
                                    inputtype={"date"}
                                    value={props.monthval}
                                    onMonthChange={props.onMonthChange}
                                      onClear={props.onClear}
                                 

                                  /> */}
                                </div>
        
    );
}

export default Searchsection;
