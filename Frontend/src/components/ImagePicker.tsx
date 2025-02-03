import { useEffect, useState } from 'react'
import { Controller, Control, UseFormSetValue } from 'react-hook-form'
import { useDropzone } from 'react-dropzone'
import { Box, Typography } from '@mui/material'
import { Image } from '@mui/icons-material'

interface ImagePickerProps {
  control: Control<any>
  setValue: UseFormSetValue<any>
  name: string
  imageUrl?: string
  required?: boolean
}

export default function ImagePicker({ control, setValue, name, imageUrl, required = false }: ImagePickerProps) {
  const [file, setFile] = useState<File | null>(null)
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    accept: { 'image/*': [] },
    maxSize: 1048576 * 10, // 10MB in bytes
    onDrop: acceptedFiles => {
      setValue(name, acceptedFiles[0])
    },
  })

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0])
      setValue(name, acceptedFiles[0])
    }
    console.log(acceptedFiles)
  }, [acceptedFiles, name, setValue])

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required ? 'An image is required' : false }}
      render={({ fieldState: { error } }) => (
        <Box
          {...getRootProps()}
          sx={{
            position: 'relative',
            borderRadius: '20px',
            minHeight: '200px',
            maxHeight: '200px',
            overflow: 'hidden',
            border: '2px dashed',
            borderColor: error ? 'error.main' : 'grey.500',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <input {...getInputProps()} />
          <Box
            sx={{
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
              width: '100%',
              height: '100%',
              bgcolor: 'transparent',
              transition: '0.3s',
              '&:hover': {
                bgcolor: 'rgba(0, 60, 108, 0.5)',
                color: 'white',
              },
              ...{ ...(isDragActive && { bgcolor: 'rgba(0, 60, 108, 0.5)', color: 'white' }) },
            }}
          >
            <Image sx={{fontSize: 40}}/>
          </Box>
          {file ? (
            <img
              src={URL.createObjectURL(file)}
              alt='Preview'
              style={{ width: '100%', height: '100%' }}
            />
          ) : imageUrl ? (
            <img src={imageUrl} alt='Preview' style={{ width: '100%', height: '100%' }} />
          ) : null}
          {error && (
            <Typography color='error' sx={{ zIndex: 11, position: 'absolute', bottom: 0 }}>
              {error.message}
            </Typography>
          )}
        </Box>
      )}
    />
  )
}
