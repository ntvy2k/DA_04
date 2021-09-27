import React, { useState } from 'react';
import PropTypes from 'prop-types';
import JoditReact from "jodit-react-ts";
import 'jodit/build/jodit.min.css';

TextEditTor.propTypes = {

};

function TextEditTor() {
    const [value, setValue] = useState<string>();

    return (
        <div>
            <JoditReact onChange={(content) => setValue(content)} defaultValue="Hi" />
            {value}
        </div>
    );
}

export default TextEditTor;