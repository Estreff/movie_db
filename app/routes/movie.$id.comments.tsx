import type { ActionArgs, LoaderArgs } from '@remix-run/node';
import {
  Form,
  useLoaderData,
  useActionData,
  useNavigation,
  useParams,
} from '@remix-run/react';
import { useEffect, useRef } from 'react';
import { db } from '~/utils/db.server';

export async function loader({ params }: LoaderArgs) {
  const data = await db.comment.findMany({
    where: {
      movieId: params.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return data;
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();

  const data = await db.comment.create({
    data: {
      message: formData.get('comment') as string,
      movieId: formData.get('id') as string,
    },
  });

  return data;
}

export default function Comments() {
  const { id } = useParams();
  const data = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  let $form = useRef<HTMLFormElement>(null);
  let actionData = useActionData<typeof action>();

  useEffect(
    function resetFormOnSuccess() {
      if (navigation.state === 'idle') {
        $form.current?.reset();
      }
    },
    [navigation.state, actionData]
  );

  return (
    <div className="bg-teal-100 rounded-lg p-3 border">
      <h2 className="text-center text-xl font-semibold text-teal-600 pb-4">
        Your Opinion
      </h2>
      <div>
        <Form ref={$form} method="POST">
          <textarea
            name="comment"
            className="w-full border border-teal-500 rounded-lg p-4 mb-4"
          ></textarea>
          <input type="hidden" name="id" value={id} />
          {navigation.state === 'submitting' ? (
            <button
              type="button"
              disabled
              className="bg-teal-500 px-4 py-2 rounded-lg text-white"
            >
              Loading...
            </button>
          ) : (
            <button
              type="submit"
              className="bg-teal-500 px-4 py-2 rounded-lg text-white"
            >
              Add Comment
            </button>
          )}
        </Form>
        <div className="mt-5 flex flex-col gap-y-3">
          {data.map((post: any) => (
            <div key={post.id}>
              <p>{post.message}</p>
              <em className="italic float-right text-xs">{post.createdAt}</em>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
