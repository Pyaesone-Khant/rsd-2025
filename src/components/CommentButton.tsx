// icons
import { Comment as CommentIcon } from "@mui/icons-material"

// types
import { CommentProps, PostProps } from "@typings/types"

// components
import { Button, ButtonGroup, IconButton } from "@mui/material"

const CommentButton = ({item, comment}: {item: PostProps | CommentProps, comment?: boolean}) => {
  return (
    <>
    {
        !comment && (
            <ButtonGroup sx={{ml: 3}} >
                <IconButton size="small" >
                    <CommentIcon fontSize="small" color="info" />
                </IconButton>
                <Button variant="text" size="small" sx={{
                    color: "text.fade"
                }} >
                    {(item as PostProps).comments?.length}
                </Button>
            </ButtonGroup>
        )
    }
    </>
  )
}

export default CommentButton
