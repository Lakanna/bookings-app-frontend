import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { editBooking } from "../../redux/bookings/operations.js";
import { selectUser } from "../../redux/auth/selectors.js";

export const BookingEditForm = ({ booking, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const validationSchema = Yup.object({
    startAt: Yup.date()
      .min(new Date(), "Start time must be in the future")
      .required("Start time is required"),
    endAt: Yup.date()
      .min(Yup.ref("startAt"), "End time must be after start time")
      .required("End time is required"),
    notes: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      startAt: booking.startAt.slice(0, 16),
      endAt: booking.endAt.slice(0, 16),
      notes: booking.notes || "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await dispatch(
          editBooking({
            bookingId: booking._id,
            startAt: new Date(values.startAt).toISOString(),
            endAt: new Date(values.endAt).toISOString(),
            notes: values.notes,
          })
        ).unwrap();

        onClose();
      } catch (err) {
        console.error(err);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Edit Booking</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          {user.role === "client" && (
            <>
              <TextField
                label="Start Time"
                type="datetime-local"
                fullWidth
                margin="normal"
                name="startAt"
                value={formik.values.startAt}
                onChange={formik.handleChange}
                error={formik.touched.startAt && Boolean(formik.errors.startAt)}
                helperText={formik.touched.startAt && formik.errors.startAt}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="End Time"
                type="datetime-local"
                fullWidth
                margin="normal"
                name="endAt"
                value={formik.values.endAt}
                onChange={formik.handleChange}
                error={formik.touched.endAt && Boolean(formik.errors.endAt)}
                helperText={formik.touched.endAt && formik.errors.endAt}
                InputLabelProps={{ shrink: true }}
              />
            </>
          )}
          <TextField
            label="Notes"
            name="notes"
            multiline
            rows={2}
            fullWidth
            margin="normal"
            value={formik.values.notes}
            onChange={formik.handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={formik.isSubmitting}>
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
