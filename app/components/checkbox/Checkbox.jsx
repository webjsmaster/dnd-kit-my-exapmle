'use client'

import {Box, NativeCheckbox, Wrapper} from "@/app/components/checkbox/styled";

const Checkbox = ({
                      checked,
                      value,
                      children,
                      onChange = () => {
                      },
                  }) => (
    <Wrapper>
        <NativeCheckbox
            checked={checked}
            onChange={onChange}
            value={value}
        />

        <Box hasNoChildren={!children}/>
    </Wrapper>
)

export default Checkbox
