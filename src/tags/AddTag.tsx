import { ActionIcon, CloseButton, TextInput } from '@mantine/core';
import { useState } from 'react';
import { MdAdd } from 'react-icons/md';

export function AddTag({ onSubmit }: { onSubmit: (tag: string) => void }) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState('');

  const onClear = () => {
    setIsEditing(false);
    setValue('');
  };

  return !isEditing ? (
    <ActionIcon onClick={() => setIsEditing(true)} variant='subtle'>
      <MdAdd />
    </ActionIcon>
  ) : (
    <TextInput
      value={value}
      size='xs'
      onChange={(event) => setValue(event.currentTarget.value)}
      onKeyDown={(k) => {
        if (k.key === 'Enter') {
          onSubmit(value.toLowerCase());
          onClear();
        } else if (k.key === 'Escape') {
          onClear();
        }
      }}
      rightSection={<CloseButton onClick={onClear} size='xs' />}
      inputSize='xs'
    />
  );
}
