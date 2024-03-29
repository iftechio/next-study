import React, { useState } from 'react';
import { Box, Flex, Card, Text, Grid, RadioGroup, TextArea, Button, CheckboxGroup, Radio } from '@radix-ui/themes';


export default function FirstPost() {
    const [selectedValues, setSelectedValues] = useState({ checkbox: [], radio: '', text: '' });

    const handleCheckboxChange = (value) => {
        const newValues = { ...selectedValues, checkbox: value };
        setSelectedValues(newValues);
    };

    const handleRadioChange = (value) => {
        const newValues = { ...selectedValues, radio: value };
        setSelectedValues(newValues);
    };

    const handleTextChange = (event) => {
        const newText = event.target.value;
        const newValues = { ...selectedValues, text: newText };
        setSelectedValues(newValues);
    };

    const handleClick = () => {
        // 这里可以添加您的点击事件逻辑
        console.log('按钮被点击了');
        console.log('多选内容：', selectedValues.checkbox);
        console.log('单选内容：', selectedValues.radio);
        console.log('文本内容：', selectedValues.text);
    };

    return (
        <Box maxWidth="400px">
            <Card size="2">
                <Flex direction="column" gap="3">
                    <Grid gap="1">
                        <Text as="div" weight="bold" size="2" mb="1">
                            这是一个多选问题
                        </Text>
                        <CheckboxGroup.Root value={selectedValues.checkbox} onValueChange={handleCheckboxChange} name="example">
                            <CheckboxGroup.Item value="1">Fun</CheckboxGroup.Item>
                            <CheckboxGroup.Item value="2">Serious</CheckboxGroup.Item>
                            <CheckboxGroup.Item value="3">Smart</CheckboxGroup.Item>
                        </CheckboxGroup.Root>
                    </Grid>

                    <Grid gap="2">
                        <Flex align="start" direction="column" gap="1">
                            <Text as="div" weight="bold" size="2" mb="1">
                                这是一个单选问题
                            </Text>
                            <RadioGroup.Root value={selectedValues.radio} onValueChange={handleRadioChange} name="example">
                                <RadioGroup.Item value="1">Default</RadioGroup.Item>
                                <RadioGroup.Item value="2">Comfortable</RadioGroup.Item>
                                <RadioGroup.Item value="3">Compact</RadioGroup.Item>
                            </RadioGroup.Root>
                        </Flex>
                    </Grid>

                    <Grid gap="3">
                        <Flex asChild justify="between">
                            <TextArea placeholder="others" value={selectedValues.text} onChange={handleTextChange} />
                        </Flex>
                    </Grid>

                    <Grid gap="4">
                        <Flex gap="4">
                            <Button color="cyan" radius="full" onClick={handleClick}>
                                Submit
                            </Button>
                        </Flex>
                    </Grid>

                </Flex>
            </Card>
        </Box>
    );
}
