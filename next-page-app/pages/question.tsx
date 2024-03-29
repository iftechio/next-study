import React, { useState } from 'react';
import {
  Box,
  RadioGroup,
  Flex,
  Card,
  Text,
  Grid,
  TextArea,
  Button,
  Checkbox,
  CheckboxGroup,
  Radio,
} from '@radix-ui/themes';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';

const queryClient = new QueryClient();

interface Question {
  success: boolean;
  data: {
    id: string;
    name: string;
    description: string;
    allowCustom: boolean;
    type: string;
    options: string[];
  };
}

export default function HelloWorld() {
  return (
    <QueryClientProvider client={queryClient}>
      <FirstPost />
    </QueryClientProvider>
  );
}

function FirstPost() {
  const [selectedValues, setSelectedValues] = useState({ checkbox: [], radio: '', text: '' });

  const handleCheckboxChange = (value:any) => {
    const newValues = { ...selectedValues, checkbox: value };
    setSelectedValues(newValues);
  };

  const handleRadioChange = (value:any) => {
    const newValues = { ...selectedValues, radio: value };
    setSelectedValues(newValues);
  };

  const handleTextChange = (event: any) => {
    const newText = event.target.value;
    const newValues = { ...selectedValues, text: newText };
    setSelectedValues(newValues);
  };

  const handleClick = () => {
    console.log('按钮被点击了');
    console.log('多选内容：', selectedValues.checkbox);
    console.log('单选内容：', selectedValues.radio);
    console.log('文本内容：', selectedValues.text);

    let questionResult: string[] = [];
    if (selectedValues.checkbox.length > 0) {
      questionResult = selectedValues.checkbox;
    } else {
      questionResult = [selectedValues.radio];
    }
    if (selectedValues.text) {
      questionResult.push("其他");
    }

    try {
      const fetchData = async () => {
        const response = await fetch('http://127.0.0.1:3002/api/submit-questionnaire', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            questionId: 'clu9oe58n004otnt6xd5ab5dd',
            results: selectedValues.checkbox,
            customText: selectedValues.text,
          }),
        });
        const res = await response.json();
        console.log('提交结果：', res);
      };

      fetchData();
    } catch (error) {
      console.error('Error:', error);
    }
    
  };

  const { isLoading, error, data} = useQuery({
    queryKey: ['questionId'],
    queryFn: () =>
      fetch(`http://127.0.0.1:3002/api/questionnaire`, {
        method: 'GET',
      }).then((res) => res.json()),
  }) as { isLoading: boolean; error: any; data: Question };

  if (isLoading) return <div>加载中...</div>;

  if (error) return <div>发生错误</div>;

  if (data.success === false) {
    return <div>获取问题失败</div>;
  }

  const questionInfo = data.data;

  return (
    <Box maxWidth="400px">
      <Card size="2">
        <Flex direction="column" gap="3">
          <Grid gap="1">
            <Text as="div" weight="bold" size="2" mb="1">
              {questionInfo.name}
            </Text>
            <Text as="div" weight="bold" size="1" mb="1">
              {questionInfo.description}
            </Text>
            <CheckboxGroup.Root value={selectedValues.checkbox} onValueChange={handleCheckboxChange} name="example">
              {questionInfo.options.map((option, index) => (
                <CheckboxGroup.Item key={index} value={option}>
                  {option}
                </CheckboxGroup.Item>
              ))}
            </CheckboxGroup.Root>
          </Grid>

          <Grid gap="2">
            <Flex align="start" direction="column" gap="1">
              <Text as="div" weight="bold" size="2" mb="1">
                这是一个单选问题
              </Text>
              <RadioGroup.Root value={selectedValues.radio} onValueChange={handleRadioChange} name="example">
                {questionInfo.options.map((option, index) => (
                  <RadioGroup.Item key={index} value={option}>
                    {option}
                  </RadioGroup.Item>
                ))}
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
